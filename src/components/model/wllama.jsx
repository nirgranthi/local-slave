/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { Wllama } from '@wllama/wllama';
import { friendlyPrompt } from './systemPrompt.jsx';

/* 
local storage keys
sessions, downloadedModels
*/

export function WllamaChat({
  isRecommended,
  setIsRecommended,
  userPrompt,
  uploadedModel,
  chatMessages,
  setChatMessages,
  setLiveToken,
  setIsLiveTokenLive,
  setModelStatus,
  selectedModelUrl,
  setIsModelDownloading,
  setLoadedModelName,
  stopModelReplyRef,
  setUserPrompt,
  setUploadedModel,
  promptConfig,
  modelConfig,
  setActiveDownloads,
  setModelConfig,
  reloadModel,
  setIsModelConfigOpen
}) {
  const [wllama, setWllama] = useState(null);
  const [activeModel, setActiveModel] = useState({ type: null, file: null })
  const n_ctx = useRef(null)

  const UpdateModelConfig = () => {
    setModelConfig(prev => ({
      ...prev,
      ["n_ctx"]: n_ctx.current
    }))
    console.log(modelConfig)
  }

  /* this ends up deleting active downloads */
  async function unloadModel() {
    if (wllama.isModelLoaded()) {
      try {
        await wllama.exit()
        setModelStatus('OFFLINE')
        setLoadedModelName('No model loaded')
      } catch (error) {
        console.log('Error ocurred while unloading model: ', error)
      }
    }
  }

  /* wllama config */
  useEffect(() => {
    try {
      const config = {
        'single-thread/wllama.wasm': '/wllama/single-thread/wllama.wasm',
        'multi-thread/wllama.wasm': '/wllama/multi-thread/wllama.wasm'
      };
      const instance = new Wllama(config);
      setWllama(instance);
    } catch (err) {
      console.error("Error: ", err);
    }
  }, [])

  /* user prompt */
  useEffect(() => {
    if (!userPrompt || !wllama) return;
    console.log(isRecommended)
    /* console.log('wllama: ', wllama.metadata.meta['general.name']) */
    stopModelReplyRef.current = new AbortController
    const runAi = async () => {
      try {
        setModelStatus('ONLINE')
        const history = chatMessages.map(msg => ({
          content: msg.message,
          role: msg.sender === 'ai' ? 'assistant' : 'user'
        }));

        const prompt = await wllama.formatChat([
          { content: friendlyPrompt, role: 'system' },
          ...history,
          { content: userPrompt, role: 'user' }
        ], true
        )
        setLiveToken('')
        setIsLiveTokenLive(true)
        setModelStatus('THINKING...')
        const result = await wllama.createCompletion(prompt, {
          abortSignal: stopModelReplyRef.current.signal,
          n_predict: 500,
          sampling: promptConfig,
          onNewToken: (token, piece, text) => {
            setLiveToken(text);
          }
        });
        /* console.log("Full Reply:", result) */
        setChatMessages(prev => [
          ...prev,
          { sender: 'user', message: userPrompt, id: crypto.randomUUID() },
          { sender: 'ai', message: result, id: crypto.randomUUID() }
        ])
      } catch (err) {
        console.error("Error:", err)
        setModelStatus('ERROR')
      } finally {
        setIsLiveTokenLive(false)
        setModelStatus('ONLINE')
        setUserPrompt('')
      }
    }
    runAi()
  }, [userPrompt, setChatMessages])

  /* uploaded model */
  useEffect(() => {
    if (!uploadedModel) return;
    /* update ctx here */
    /* if (isRecommended) {
      console.log(wllama)
      const ctxLength = wllama.metadata.meta["llama.context_length"] || 16384
      UpdateModelConfig(ctxLength)
    } */
    const loadModel = async () => {
      await unloadModel()

      try {
        setModelStatus('Loading...')
        setActiveModel({ type: 'file', file: uploadedModel })
        /* console.log(wllama) */

        await wllama.loadModel([uploadedModel], modelConfig)

        setLoadedModelName(wllama.metadata.meta['general.name'])
        n_ctx.current = wllama.metadata.hparams.nCtxTrain
        setModelStatus('ONLINE')
        /* console.log('is model loaded: ', wllama.isModelLoaded())
        console.log(wllama.metadata.hparams.nCtxTrain) */
      } catch (error) {
        console.log('Model could not be loaded', error)
        setModelStatus('OFFLINE')
      } finally {
        setUploadedModel(null)
      }
    }
    loadModel()
  }, [uploadedModel])

  /* model download */
  useEffect(() => {
    if (!selectedModelUrl) return;
    /* console.log(selectedModelUrl) */
    setIsModelDownloading(true)

    const downloadModel = async () => {
      try {
        await unloadModel()
        /* console.log(wllama) */
        setModelStatus('DOWNLOADING...')
        setLoadedModelName('No model Loaded')
        setActiveModel({ type: 'url', file: selectedModelUrl })

        await wllama.loadModelFromUrl(selectedModelUrl, {
          useCache: true,
          progressCallback: ({ loaded, total }) => {
            const pct = Math.round((loaded / total) * 100)
            const details = `${(loaded / 1024 / 1024).toFixed(1)}MB / ${(total / 1024 / 1024).toFixed(1)}MB`
            setActiveDownloads(prev => ({
              ...prev,
              [selectedModelUrl]: { progress: pct, detail: details }
            }))
          },
          ...modelConfig
        })

        n_ctx.current = wllama.metadata.hparams.nCtxTrain
        setLoadedModelName(wllama.metadata.meta['general.name'])
      } catch (error) {
        setModelStatus('OFFLINE')
        console.log('error downloading: ', error)
      }
      finally {
        syncCacheWithLocalStorage()
        console.log('model downloaded')

        setIsModelDownloading(false)
        setModelStatus("ONLINE")
        setActiveDownloads(prev => {
          const newState = { ...prev }
          delete newState[selectedModelUrl]
          return newState
        })
      }
    }
    downloadModel()
  }, [selectedModelUrl])

  /* reloads model */
  useEffect(() => {
    const reloadModel = async () => {
      if (!wllama || !activeModel.file) return
      /* console.log(wllama) */
      console.log(n_ctx.current)
      if (isRecommended) { UpdateModelConfig() }
      setIsRecommended(false)
      setIsModelConfigOpen(false)

      try {
        setModelStatus('RELOADING...')
        if (wllama.isModelLoaded()) {
          await wllama.exit()
        }

        if (activeModel.type === 'url') {
          await wllama.loadModelFromUrl(activeModel.file, {
            useCache: true,
            ...modelConfig
          })
        } else if (activeModel.type === 'file') {
          await wllama.loadModel([activeModel.file], modelConfig)
        }

        setLoadedModelName(wllama.metadata.meta['general.name']);
        setModelStatus('ONLINE')
      } catch (error) {
        console.error("Reloading failed:", error)
        setModelStatus('ERROR')
      }
    }
    reloadModel()
  }, [reloadModel, isRecommended])

  /* Sync downloaded models with local Storage */
  const syncCacheWithLocalStorage = async () => {
    if (!wllama) return;
    try {
      const models = await wllama.modelManager.getModels()
      // Extracting primary URL (sharded models ke liye array ka pehla element)
      const urls = models.map(model => Array.isArray(model.url) ? model.url[0] : model.url)
      const newurls = []
      urls.forEach(url => {
        if (url) newurls.push(url)
      })
      localStorage.setItem('downloadedModels', JSON.stringify(newurls))
    } catch (err) {
      console.error('Error:', err)
    }
  };
}







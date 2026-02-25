import { useState, useEffect } from 'react';
import { Wllama } from '@wllama/wllama';
import { friendlyPrompt } from './systemPrompt.jsx';

/* 
local storage keys
sessions, downloadedModels
*/

export function WllamaChat({
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
  setActiveDownloads
}) {
  const [wllama, setWllama] = useState(null);

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

  /* uploaded model */
  useEffect(() => {
    if (!uploadedModel) return;
    const loadModel = async () => {
      try {
        await wllama.exit()
        setModelStatus('OFFLINE')
        setLoadedModelName('No model loaded')
      } catch (error) {
        console.log('Error ocurred while unloading model: ', error)
      }

      try {
        setModelStatus('Loading...')
        console.log(wllama)
        await wllama.loadModel([uploadedModel], modelConfig);
        setLoadedModelName(wllama.metadata.meta['general.name'])
        setModelStatus('ONLINE')
        console.log('is model loaded: ', wllama.isModelLoaded())
      } catch (error) {
        console.log('Model could not be loaded', error)
        setModelStatus('OFFLINE')
      } finally {
        setUploadedModel(null)
      }

    }
    loadModel()
  }, [uploadedModel])

  /* user prompt */
  useEffect(() => {
    if (!userPrompt || !wllama) return;
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

  /* model download */
  useEffect(() => {
    if (!selectedModelUrl) return;
    /* console.log(selectedModelUrl) */

    setIsModelDownloading(true)

    const downloadModel = async () => {
      try {
        /* console.log(wllama) */
        setModelStatus('DOWNLOADING...')
        setLoadedModelName('No model Loaded')
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
        setLoadedModelName(wllama.metadata.meta['general.name'])
      } catch (error) {
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







import { useState, useEffect } from 'react';
import { Wllama } from '@wllama/wllama';
import systemPrompt from './systemPrompt.txt?raw';

export function WllamaChat({
  userPrompt,
  uploadedModel,
  chatMessages,
  setChatMessages,
  setLiveToken,
  setIsLiveTokenLive,
  setModelStatus,
  selectedModelUrl,
  setDlPercent,
  setDlDetails,
  setIsModelDownloading,
  setLoadedModelName,
  stopModelReplyRef,
  setUserPrompt,
  setUploadedModel
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
        await wllama.loadModel([uploadedModel], { n_ctx: 8192 });
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
  }, [wllama, uploadedModel])

  /* user prompt */
  useEffect(() => {
    if (!userPrompt || !wllama) return;
    console.log('wllama: ', wllama.metadata.meta['general.name'])
    stopModelReplyRef.current = new AbortController
    const runAi = async () => {
      try {
        setModelStatus('ONLINE')
        const history = chatMessages.map(msg => ({
          content: msg.message,
          role: msg.sender === 'ai' ? 'assistant' : 'user'
        }));

        const prompt = await wllama.formatChat([
          { content: systemPrompt, role: 'system' },
          ...history,
          { content: userPrompt, role: 'user' }
        ], true
        );
        console.log("Prompt is: ", prompt);
        setLiveToken('')
        setIsLiveTokenLive(true)
        const result = await wllama.createCompletion(prompt, {
          abortSignal: stopModelReplyRef.current.signal,
          n_predict: 500,
          onNewToken: (token, piece, text) => {
            setLiveToken(text);
          }
        });
        console.log("Full Reply:", result);
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
        setUserPrompt('')
      }
    }
    runAi()
  }, [wllama, userPrompt, setChatMessages])

  /* model download */
  useEffect(() => {
    if (!selectedModelUrl) return;
    console.log(selectedModelUrl)

    setIsModelDownloading(true)

    const downloadModel = async () => {
      try {
        await wllama.exit()
        setModelStatus('DOWNLOADING...')
        setLoadedModelName('No model Loaded')
        await wllama.loadModelFromUrl(selectedModelUrl, {
          useCache: true,
          progressCallback: ({ loaded, total }) => {
            const pct = Math.round((loaded / total) * 100);
            setDlPercent(pct)
            setDlDetails(`${(loaded / 1024 / 1024).toFixed(1)}MB / ${(total / 1024 / 1024).toFixed(1)}MB`)
          },
          n_ctx: 8192
        })
        setLoadedModelName(wllama.metadata.meta['general.name'])
      } catch (error) {
        console.log('error downloading: ', error)
      }
      finally {
        console.log('model downloaded')
        setIsModelDownloading(false)
        setModelStatus("ONLINE")
        setDlPercent(0)
        setDlDetails('0MB / 0MB')
      }
    }
    downloadModel()
  }, [selectedModelUrl])
}







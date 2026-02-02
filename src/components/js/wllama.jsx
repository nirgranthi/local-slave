import { useState, useEffect } from 'react';
import { Wllama } from '@wllama/wllama';

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
  setIsModelDownloading
}) {
  const [loading, setLoading] = useState(false);
  const [wllama, setWllama] = useState(null);

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


  useEffect(() => {
    if (!uploadedModel) return;
    const loadModel = async () => {
      await wllama.loadModel([uploadedModel], { n_ctx: 8192 });
      setModelStatus('ONLINE')
      console.log("Model loaded.");
      console.log('is model loaded: ', wllama.isModelLoaded())
      setLoading(true);
    }
    loadModel()
  }, [wllama, uploadedModel])

  useEffect(() => {
    console.log('user prompt is: ', userPrompt)
    if (!userPrompt || !wllama) return;
    setIsLiveTokenLive(true)
    console.log('user prompt is: ', userPrompt)
    const runAi = async () => {
      try {
        const prompt = await wllama.formatChat([
          {
            content: 'You are a helpful assistant.',
            role: 'system'
          },
          {
            content: userPrompt,
            role: 'user'
          }
        ], true
        );
        console.log("Prompt is: ", prompt);
        const result = await wllama.createCompletion(prompt, {
          n_predict: 100,
          onNewToken: (token, piece, text) => (
            setLiveToken(text)
          )
        });
        console.log("Full Reply:", result);
        setIsLiveTokenLive(false)
        setChatMessages([
          ...chatMessages, {
            sender: 'user',
            message: userPrompt,
            id: crypto.randomUUID()
          }, {
            sender: 'ai',
            message: result,
            id: crypto.randomUUID()
          }
        ])
        console.log(chatMessages)
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    runAi()
  }, [wllama, userPrompt])

  useEffect(() => {
    if (!selectedModelUrl) return;
    console.log(selectedModelUrl)

    setIsModelDownloading(true)
    
    const downloadModel = async () => {
      try {
        await wllama.loadModelFromUrl(selectedModelUrl, {
          useCache: true,
          progressCallback: ({ loaded, total }) => {
            const pct = Math.round((loaded / total) * 100);
            setDlPercent(pct)
            setDlDetails(`${(loaded / 1024 / 1024).toFixed(1)}MB / ${(total / 1024 / 1024).toFixed(1)}MB`)
          }
        })
      } finally {
        setIsModelDownloading(false)
        setModelStatus("ONLINE")
        setDlPercent(0)
        setDlDetails('0MB / 0MB')
      }
    }
    downloadModel()
  }, [selectedModelUrl])
}






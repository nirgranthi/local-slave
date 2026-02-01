import { useState, useEffect } from 'react';
import { Wllama } from '@wllama/wllama';

export function WllamaChat({ uploadedModel, userPrompt, chatMessages, setChatMessages, setLiveToken, setIsLiveTokenLive, setModelStatus }) {
  const [loading, setLoading] = useState(false);
  const [wllama, setWllama] = useState(null);


  /*use 3 useeffect
  1. config
  start with if return to not let them run immediately
  2. model load, update on upload
  3.prompt, update on prompt*/

  useEffect(() => {
    if (!uploadedModel) return;

    try {
      const config = {
        'single-thread/wllama.wasm': '/wllama/single-thread/wllama.wasm',
        'multi-thread/wllama.wasm': '/wllama/multi-thread/wllama.wasm'
      };
      const instance = new Wllama(config);
      setWllama(instance);
      setModelStatus('ONLINE')
      console.log("Model loaded.");
    } catch (err) {
      console.error("Error: ", err);
    }
  }, [uploadedModel, setModelStatus])


  useEffect(() => {
    if (!wllama) return;
    const loadModel = async () => {
      //console.log('runAi: wllama: ', wllama)
      await wllama.loadModel([uploadedModel], { n_ctx: 8192 });
      console.log('is model loaded: ', wllama.isModelLoaded())
      setLoading(true);
    }
    loadModel()
  }, [wllama, uploadedModel])

  useEffect(() => {
    console.log('user prompt is: ', userPrompt)
    console.log('wllama: ', wllama)
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
}






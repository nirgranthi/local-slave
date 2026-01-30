import { useState, useEffect } from 'react';
import { Wllama } from '@wllama/wllama';

export function WllamaChat({ uploadedModel }) {
  const [loading, setLoading] = useState(false);
  const [wllama, setWllama] = useState(null);

  const config = {
    'single-thread/wllama.js': '/wllama/single-thread/wllama.js',
    'single-thread/wllama.wasm': '/wllama/single-thread/wllama.wasm',
    'multi-thread/wllama.js': '/wllama/multi-thread/wllama.js',
    'multi-thread/wllama.wasm': '/wllama/multi-thread/wllama.wasm',
    'multi-thread/wllama.worker.mjs': '/wllama/multi-thread/wllama.worker.mjs'
  };


  useEffect(() => {
    if (!uploadedModel) {
      setLoading(false);
      return;
    }
    try {
      const instance = new Wllama(config);
      
      setWllama(instance);
      console.log("model loaded..");
    } catch (err) {
      console.error("Load Error:", err);
    } finally {
      setLoading(false);
    }
  }, [uploadedModel])


  useEffect(() => {
    if (!wllama) return;
    const runAI = async () => {
      //console.log('runAi: wllama: ', wllama)
      await wllama.loadModel([uploadedModel], { n_ctx: 8192 });
      console.log('is model loaded: ', wllama.isModelLoaded())
      setLoading(true);

      try {
        const prompt = await wllama.formatChat([
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Explain React in 10 words.' }
        ]);
        console.log("AI is thinking...");
        const result = await wllama.createCompletion(prompt, {
          n_predict: 100,
          onToken: (t) => console.log("Token:", t.token),
        });

        console.log("Full Reply:", result);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    runAI()
  }, [wllama])
}
console.log('startign...')




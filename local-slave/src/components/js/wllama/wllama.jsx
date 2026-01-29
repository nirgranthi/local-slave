import { useState } from 'react';
import { Wllama } from '@wllama/wllama';

export function WllamaChat() {
  const [loading, setLoading] = useState(false);
  const [wllama, setWllama] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const config = {
      'single-thread/wllama.js': '/wllama/single-thread/wllama.js',
      'single-thread/wllama.wasm': '/wllama/single-thread/wllama.wasm',
      'multi-thread/wllama.js': '/wllama/multi-thread/wllama.js',
      'multi-thread/wllama.wasm': '/wllama/multi-thread/wllama.wasm',
      'multi-thread/wllama.worker.mjs': '/wllama/multi-thread/wllama.worker.mjs'
    };

    try {
      const instance = new Wllama(config);
      await instance.loadModel([file], { n_ctx: 2048 });
      setWllama(instance);
      console.log("model loaded..");
    } catch (err) {
      console.error("Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const runAI = async () => {
    if (!wllama) return;
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

  return (
    <div>
      <input type="file" accept=".gguf" onChange={handleFileUpload} />
      <button onClick={runAI} disabled={!wllama || loading}>
        {loading ? 'Processing...' : 'Ask AI'}
      </button>
    </div>
  );
}
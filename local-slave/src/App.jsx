import { Wllama } from 'https://cdn.jsdelivr.net/npm/@wllama/wllama@1.16.2/esm/index.js';
import './App.css'

function App() {
  import { Wllama } from 'https://cdn.jsdelivr.net/npm/@wllama/wllama@1.16.2/esm/index.js';

  const CONFIG = {
    'single-thread/wllama.js': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@1.16.2/esm/single-thread/wllama.js',
    'single-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@1.16.2/esm/single-thread/wllama.wasm',
  };

  // --- State ---
  let wllama;
  let isReady = false;
  let sessions = JSON.parse(localStorage.getItem('lai_sessions') || '{}');
  let currentSessionId = null;
  let downloadedModels = JSON.parse(localStorage.getItem('lai_downloaded_models') || '[]');
  let activeModelUrl = null;
  let isModelLoading = false; // LOCK to prevent race conditions

  const ui = {
    header: document.getElementById('header-status'),
    modelName: document.getElementById('active-model-name'),
    input: document.getElementById('user-input'),
    btn: document.getElementById('send-btn'),
    engineState: document.getElementById('engine-state'),
    welcome: document.getElementById('welcome-message'),
    csvList: document.getElementById('csv-model-list'),
    historyList: document.getElementById('history-list'),
    dlContainer: document.getElementById('dl-progress-container'),
    dlPercent: document.getElementById('dl-percent'),
    dlBar: document.getElementById('dl-bar'),
    dlDetails: document.getElementById('dl-details'),
    chatBox: document.getElementById('chat-box')
  };

  // --- Initialization ---
  async function init() {
    try {
      ui.engineState.textContent = "BOOTING";
      wllama = new Wllama(CONFIG);

      ui.engineState.textContent = "READY";
      ui.engineState.className = "text-[10px] px-2 py-1 rounded bg-green-900/50 text-green-400 font-mono";
      isReady = true;

      startNewChat();
      renderHistoryList();
      await loadModelList();

      ui.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });

    } catch (e) {
      ui.engineState.textContent = "ERROR";
      ui.engineState.className = "text-[10px] px-2 py-1 rounded bg-red-900/50 text-red-400 font-mono";
      console.error(e);
    }
  }

  // --- Session Management ---
  window.startNewChat = () => {
    currentSessionId = Date.now().toString();
    sessions[currentSessionId] = { title: "New Chat", timestamp: Date.now(), messages: [] };
    saveSessions();

    ui.chatBox.innerHTML = '';
    ui.chatBox.appendChild(ui.welcome);
    ui.welcome.classList.remove('hidden');
    renderHistoryList();

    if (activeModelUrl) {
      ui.input.disabled = false;
      ui.btn.disabled = false;
      ui.input.placeholder = "Type a message...";
      ui.input.focus();
    }
  };

  window.loadSession = (id) => {
    if (!sessions[id]) return;
    currentSessionId = id;
    const session = sessions[id];

    ui.chatBox.innerHTML = '';
    ui.welcome.classList.add('hidden');

    session.messages.forEach(msg => {
      addMessage(msg.role, msg.content, false);
    });

    if (window.innerWidth < 768) closeSidebar();

    if (activeModelUrl) {
      ui.input.disabled = false;
      ui.btn.disabled = false;
    }
  };

  function saveSessions() {
    localStorage.setItem('lai_sessions', JSON.stringify(sessions));
    renderHistoryList();
  }

  function renderHistoryList() {
    ui.historyList.innerHTML = '';
    const sortedIds = Object.keys(sessions).sort((a, b) => sessions[b].timestamp - sessions[a].timestamp);

    sortedIds.forEach(id => {
      const session = sessions[id];
      const btn = document.createElement('button');
      btn.className = `w-full text-left p-3 rounded-lg text-xs truncate transition-colors ${id === currentSessionId ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400 hover:bg-gray-800'}`;
      btn.innerText = session.title || "Untitled Chat";
      btn.onclick = () => loadSession(id);
      ui.historyList.appendChild(btn);
    });
  }

  window.clearAllHistory = () => {
    if (confirm("Delete ALL chat history?")) {
      sessions = {};
      saveSessions();
      startNewChat();
    }
  }

  // --- Model Management ---
  window.loadModelList = async () => {
    try {
      const response = await fetch('models.csv');
      if (!response.ok) throw new Error("Missing models.csv");
      const text = await response.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');

      ui.csvList.innerHTML = '';
      let firstDownloaded = null;
      const preferred = localStorage.getItem('lai_preferred_model');

      lines.forEach(line => {
        const parts = line.split(',');
        if (parts.length < 2) return;
        const url = parts[0].trim();
        const size = parts[1].trim();
        let name = url.split('/').pop().replace('.gguf', '');
        if (name.length > 20) name = name.substring(0, 18) + '...';

        const isDownloaded = downloadedModels.includes(url);
        if (isDownloaded && !firstDownloaded) firstDownloaded = url;

        const btn = document.createElement('button');
        btn.className = `w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 
                ${isDownloaded ? 'bg-green-900/20 border-green-800 hover:bg-green-900/40' : 'bg-gray-700/30 border-gray-700/50 hover:bg-gray-700'}`;

        btn.onclick = () => {
          localStorage.setItem('lai_preferred_model', url);
          loadModelFromUrl(url, name);
        };

        btn.innerHTML = `
                <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                        <span class="font-medium text-xs text-gray-300 group-hover:text-white">${name}</span>
                        ${isDownloaded ? '<span class="text-[9px] text-green-400">Available offline</span>' : ''}
                    </div>
                    <span class="text-[10px] text-gray-500 bg-black/20 px-1.5 py-0.5 rounded">${size} MB</span>
                </div>
            `;
        ui.csvList.appendChild(btn);
      });

      // Auto-load Logic
      if (preferred && downloadedModels.includes(preferred)) {
        let name = preferred.split('/').pop();
        loadModelFromUrl(preferred, name);
      } else if (firstDownloaded) {
        let name = firstDownloaded.split('/').pop();
        loadModelFromUrl(firstDownloaded, name);
      }

    } catch (e) {
      ui.csvList.innerHTML = `<div class="text-[10px] text-red-400 p-2 text-center">No models.csv found</div>`;
    }
  };

  async function loadModelFromUrl(url, name) {
    if (!isReady) return alert("Engine not ready.");
    if (window.innerWidth < 768) closeSidebar();

    // LOCK: Prevent double loading / race conditions
    if (isModelLoading) return;
    if (activeModelUrl === url) return; // Already active

    isModelLoading = true;

    // RESTART ENGINE if switching models
    if (activeModelUrl) {
      console.log("Switching models - Restarting engine...");
      ui.header.textContent = "Unloading...";
      try {
        if (wllama.exit) await wllama.exit();
      } catch (e) { console.warn(e); }
      wllama = new Wllama(CONFIG);
    }

    ui.dlContainer.classList.remove('hidden');
    ui.header.textContent = "Loading...";

    try {
      await wllama.loadModelFromUrl(url, {
        n_ctx: 2048, n_threads: 1, useCache: true,
        progressCallback: ({ loaded, total }) => {
          const pct = Math.round((loaded / total) * 100);
          ui.dlPercent.innerText = `${pct}%`;
          ui.dlBar.style.width = `${pct}%`;
          ui.dlDetails.innerText = `${(loaded / 1024 / 1024).toFixed(1)}MB / ${(total / 1024 / 1024).toFixed(1)}MB`;
        }
      });

      if (!downloadedModels.includes(url)) {
        downloadedModels.push(url);
        localStorage.setItem('lai_downloaded_models', JSON.stringify(downloadedModels));
        loadModelList();
      }

      activeModelUrl = url;
      ui.dlContainer.classList.add('hidden');
      ui.header.textContent = "Active";
      ui.modelName.textContent = name;

      ui.input.disabled = false;
      ui.btn.disabled = false;
      ui.input.placeholder = `Message ${name}...`;

    } catch (e) {
      // AUTO-RECOVERY: If "initialized" error, hard restart and try again
      if (e.message.includes("initialized")) {
        console.warn("Caught init error, forcing hard restart...");
        try {
          if (wllama.exit) await wllama.exit();
        } catch (err) { }
        wllama = new Wllama(CONFIG);
        // Retry once
        try {
          await wllama.loadModelFromUrl(url, {
            n_ctx: 2048, n_threads: 1, useCache: true,
          });
          activeModelUrl = url;
          ui.header.textContent = "Active";
          ui.modelName.textContent = name;
          ui.input.disabled = false;
          ui.btn.disabled = false;
        } catch (retryErr) {
          alert("Recovery Failed: " + retryErr.message);
        }
      } else {
        ui.dlContainer.classList.add('hidden');
        alert("Load Failed: " + e.message);
        wllama = new Wllama(CONFIG); // Reset state
      }
    } finally {
      isModelLoading = false;
      ui.dlContainer.classList.add('hidden');
    }
  }

  document.getElementById('file-upload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!isReady) return alert("Engine not ready.");

    if (activeModelUrl) {
      try { if (wllama.exit) await wllama.exit(); } catch (e) { }
      wllama = new Wllama(CONFIG);
    }

    ui.dlContainer.classList.remove('hidden');

    try {
      await wllama.loadModel([file], {
        n_ctx: 2048, n_threads: 1,
        progressCallback: ({ loaded, total }) => {
          const pct = Math.round((loaded / total) * 100);
          ui.dlBar.style.width = `${pct}%`;
        }
      });

      activeModelUrl = "local_file";
      ui.dlContainer.classList.add('hidden');
      ui.header.textContent = "Active";
      ui.modelName.textContent = file.name;
      ui.input.disabled = false;
      ui.btn.disabled = false;
      ui.input.placeholder = `Message ${file.name}...`;

    } catch (e) {
      ui.dlContainer.classList.add('hidden');
      alert(e.message);
      wllama = new Wllama(CONFIG);
    }
  });

  // --- Chat Logic ---
  window.sendMessage = async () => {
    const text = ui.input.value.trim();
    if (!text) return;

    ui.welcome.classList.add('hidden');
    ui.input.value = '';
    ui.btn.disabled = true;

    addMessage('user', text);
    sessions[currentSessionId].messages.push({ role: 'user', content: text });

    if (sessions[currentSessionId].messages.length === 1) {
      sessions[currentSessionId].title = text.substring(0, 30) + (text.length > 30 ? '...' : '');
    }
    saveSessions();

    const aiMsg = addMessage('ai', '...');
    let currentText = "";

    try {
      const history = sessions[currentSessionId].messages.slice(-10);
      let fullPrompt = `<|im_start|>system\nYou are a helpful AI assistant.<|im_end|>\n`;

      history.forEach(msg => {
        fullPrompt += `<|im_start|>${msg.role}\n${msg.content}<|im_end|>\n`;
      });
      fullPrompt += `<|im_start|>assistant\n`;

      await wllama.createCompletion(fullPrompt, {
        nPredict: 512,
        sampling: { temp: 0.4, top_k: 40, top_p: 0.9, penalty_repeat: 1.2 },
        stop: ["<|im_end|>", "<|endoftext|>"],
        onNewToken: (token, piece, text) => {
          currentText = text;
          aiMsg.innerHTML = formatText(currentText);
          scrollToBottom();
        }
      });

      sessions[currentSessionId].messages.push({ role: 'assistant', content: currentText });
      saveSessions();

    } catch (e) {
      aiMsg.innerHTML = `<span class="text-red-400">Error: ${e.message}</span>`;
    }

    ui.btn.disabled = false;
    ui.input.focus();
  };

  function addMessage(role, text, animate = true) {
    const div = document.createElement('div');
    div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} ${animate ? 'fade-in' : ''}`;
    const bubble = document.createElement('div');
    bubble.className = `max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-md ${role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'}`;
    bubble.innerHTML = formatText(text);
    div.appendChild(bubble);
    ui.chatBox.appendChild(div);
    scrollToBottom();
    return bubble;
  }

  function formatText(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/`(.*?)`/g, "<code class='bg-black/30 px-1 rounded'>$1</code>");
  }

  function scrollToBottom() { ui.chatBox.scrollTop = ui.chatBox.scrollHeight; }

  window.switchTab = (tab) => {
    document.getElementById('view-models').classList.toggle('hidden', tab !== 'models');
    document.getElementById('view-history').classList.toggle('hidden', tab !== 'history');

    document.getElementById('tab-models').className = tab === 'models' ? 'flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50' : 'flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300';
    document.getElementById('tab-history').className = tab === 'history' ? 'flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50' : 'flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300';
  };

  window.openSidebar = () => { document.getElementById('sidebar').classList.remove('-translate-x-full'); document.getElementById('backdrop').classList.remove('hidden'); }
  window.closeSidebar = () => { document.getElementById('sidebar').classList.add('-translate-x-full'); document.getElementById('backdrop').classList.add('hidden'); }

  init();
  return (
    <>
      {/* Mobile Overlay */}
      <div id="backdrop" onClick={closeSidebar}
        className="fixed inset-0 bg-black/60 z-40 hidden backdrop-blur-sm md:hidden"></div>

      {/* SIDEBAR */}
      <div id="sidebar"
        className="fixed inset-y-0 left-0 w-80 bg-gray-800 border-r border-gray-700 z-50 transform -translate-x-full md:translate-x-0 md:relative sidebar-transition flex flex-col shadow-2xl shrink-0">
        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button onClick={switchTab('models')} id="tab-models"
            className="flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50">MODELS</button>
          <button onClick={switchTab('history')} id="tab-history"
            className="flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300">HISTORY</button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-6 no-scrollbar">

          {/* MODELS TAB */}
          <div id="view-models" className="space-y-6">
            {/* CSV Models Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-gray-400 uppercase font-bold">Available Models</div>
                <button onClick={loadModelList}
                  className="text-[10px] text-blue-400 hover:underline">Refresh</button>
              </div>
              <div id="csv-model-list" className="space-y-2">
                <div className="text-xs text-gray-600 italic text-center py-4">Loading list...</div>
              </div>
            </div>

            {/* Manual Upload */}
            <div className="border-t border-gray-700 pt-4">
              <div className="text-xs text-gray-400 uppercase font-bold mb-2">Manual Upload</div>
              <label
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 hover:border-blue-500 transition-colors bg-gray-800/50">
                <div className="flex flex-col items-center justify-center pt-2 pb-3">
                  <svg className="w-6 h-6 mb-1 text-gray-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                    </path>
                  </svg>
                  <p className="text-[10px] text-gray-400">Tap to Select .gguf</p>
                </div>
                <input type="file" id="file-upload" accept=".gguf" className="hidden" />
              </label>
            </div>
          </div>

          {/* HISTORY TAB */}
          <div id="view-history" className="hidden space-y-2">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-gray-400 uppercase font-bold">Recent Chats</div>
              <button onClick={clearAllHistory} className="text-[10px] text-red-400 hover:underline">Clear
                All</button>
            </div>
            <div id="history-list" className="space-y-1">
              {/* History Items Injected Here */}
            </div>
          </div>

          {/* Download Progress */}
          <div id="dl-progress-container" className="hidden bg-gray-900 rounded-lg p-3 border border-gray-700 mt-auto">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-blue-300">Downloading...</span>
              <span id="dl-percent" className="text-white font-mono">0%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div id="dl-bar" className="bg-blue-500 h-1.5 rounded-full progress-bar" style="width: 0%"></div>
            </div>
            <div id="dl-details" className="text-[9px] text-gray-500 mt-1 text-right font-mono">0MB / 0MB</div>
          </div>
        </div>

        <div className="p-2 text-center text-[10px] text-gray-600 bg-gray-800 border-t border-gray-700">v1.17.3 (Input
          Fixes)</div>
      </div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col relative w-full bg-gray-900 min-w-0">
        {/* Header */}
        <div className="h-14 border-b border-gray-700 flex items-center px-4 justify-between bg-gray-800 z-10">
          <div className="flex items-center gap-3">
            <button onClick={openSidebar} className="md:hidden text-gray-400 p-1 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div className="flex flex-col">
              <span id="header-status" className="font-bold text-sm text-gray-200">Local AI</span>
              <span id="active-model-name" className="text-[10px] text-gray-500 truncate max-w-[150px]">No Model
                Loaded</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div id="engine-state"
              className="text-[10px] px-2 py-1 rounded bg-black/40 text-gray-400 font-mono hidden md:block">OFFLINE
            </div>
            <button onClick={startNewChat}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              New Chat
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div id="chat-box" className="flex-1 overflow-y-auto p-4 pb-40 space-y-4">
          <div id="welcome-message" className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
            <div className="p-4 bg-gray-800 rounded-full animate-bounce">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-white">How can I help you today?</h3>
              <p className="text-xs mt-1">Checking for downloaded models...</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="absolute bottom-0 w-full bg-gray-900 pt-4 pb-4 px-4 border-t border-gray-800">
          <div className="max-w-3xl mx-auto relative flex gap-2">
            <input id="user-input" type="text"
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Load a model to start..." disabled />
            <button id="send-btn" onClick={sendMessage}
              className="bg-blue-600 px-6 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              disabled>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

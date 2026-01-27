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
    try {/* 
        const response = await fetch('models.csv');
        if (!response.ok) throw new Error("Missing models.csv");
        const text = await response.text();
        const lines = text.split('\n').filter(line => line.trim() !== '');
 */
        ui.csvList.innerHTML = '';
        let firstDownloaded = null;
        const preferred = localStorage.getItem('lai_preferred_model');
/* 
        lines.forEach(line => {
            const parts = line.split(',');
            if (parts.length < 2) return;
            const url = parts[0].trim();
            const size = parts[1].trim();
            let name = url.split('/').pop().replace('.gguf', '');
            if (name.length > 20) name = name.substring(0, 18) + '...'; */

            const isDownloaded = downloadedModels.includes(url);
            if (isDownloaded && !firstDownloaded) firstDownloaded = url;

            /* const btn = document.createElement('button');
            btn.className = `w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 
                ${isDownloaded ? 'bg-green-900/20 border-green-800 hover:bg-green-900/40' : 'bg-gray-700/30 border-gray-700/50 hover:bg-gray-700'}`;
 */
            btn.onclick = () => {
                localStorage.setItem('lai_preferred_model', url);
                loadModelFromUrl(url, name);
            };

            /* btn.innerHTML = `
                <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                        <span class="font-medium text-xs text-gray-300 group-hover:text-white">${name}</span>
                        ${isDownloaded ? '<span class="text-[9px] text-green-400">Available offline</span>' : ''}
                    </div>
                    <span class="text-[10px] text-gray-500 bg-black/20 px-1.5 py-0.5 rounded">${size} MB</span>
                </div>
            `;
            ui.csvList.appendChild(btn);
        }); */

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

/* window.switchTab = (tab) => {
    document.getElementById('view-models').classList.toggle('hidden', tab !== 'models');
    document.getElementById('view-history').classList.toggle('hidden', tab !== 'history');

    document.getElementById('tab-models').className = tab === 'models' ? 'flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50' : 'flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300';
    document.getElementById('tab-history').className = tab === 'history' ? 'flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50' : 'flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300';
};

window.openSidebar = () => { document.getElementById('sidebar').classList.remove('-translate-x-full'); document.getElementById('backdrop').classList.remove('hidden'); }
window.closeSidebar = () => { document.getElementById('sidebar').classList.add('-translate-x-full'); document.getElementById('backdrop').classList.add('hidden'); }
 */
init();
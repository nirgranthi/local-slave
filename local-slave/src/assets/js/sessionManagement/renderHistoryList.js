export function renderHistoryList() {
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
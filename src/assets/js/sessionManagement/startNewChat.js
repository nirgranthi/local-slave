export const startNewChat = () => {
        const currentSessionId = Date.now().toString();
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
export window.loadSession = (id) => {
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
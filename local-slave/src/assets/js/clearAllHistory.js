export const clearAllHistory = () => {
    function saveSessions() {
        localStorage.setItem('lai_sessions', JSON.stringify(sessions));
        renderHistoryList();
    }
    if (confirm("Delete ALL chat history?")) {
        sessions = {};
        saveSessions();
        startNewChat();
    }
}
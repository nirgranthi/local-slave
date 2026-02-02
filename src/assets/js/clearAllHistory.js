import { saveSessions } from './sessionManagement/saveSession'


export const clearAllHistory = () => {
    if (confirm("Delete ALL chat history?")) {
        sessions = {};
        saveSessions();
        startNewChat();
    }
}
import { renderHistoryList } from "./renderHistoryList";

export function saveSessions() {
    let sessions = JSON.parse(localStorage.getItem('lai_sessions') || '{}');
    localStorage.setItem('lai_sessions', JSON.stringify(sessions));
    renderHistoryList();
}
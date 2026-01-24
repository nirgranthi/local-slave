import { useState } from "react";

export function MobileOverlay() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    return (
        <div id="backdrop" onClick={setIsSidebarOpen(true)}
            className="fixed inset-0 bg-black/60 z-40 hidden backdrop-blur-sm md:hidden"></div>
    );
}
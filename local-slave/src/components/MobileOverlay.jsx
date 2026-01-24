export function MobileOverlay() {
    
    return (
        <div id="backdrop" onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 z-40 hidden backdrop-blur-sm md:hidden"></div>
    );
}
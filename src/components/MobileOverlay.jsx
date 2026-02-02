export function MobileOverlay({ setIsSidebarOpen }) {
    return (
        <div
            id="backdrop"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-md md:hidden">
        </div>
    );
}
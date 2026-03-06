import { useStates } from "./Context";

export function MobileOverlay() {
    const { setIsSidebarOpen } = useStates()
    return (
        <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-md md:hidden">
        </div>
    );
}
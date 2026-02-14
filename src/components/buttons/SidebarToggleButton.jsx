import { HamburgerSvg } from "../svg/HamburgerSvg.jsx";

export function SidebarToggleButton({isSidebarOpen, setIsSidebarOpen}) {
    return (
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 p-1 hover:text-white">
            <HamburgerSvg />
        </button>
    )
}
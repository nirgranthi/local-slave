import { HamburgerSvg } from "../svg/HamburgerSvg";

export function SidebarToggleButton({isSidebarOpen, setIsSidebarOpen}) {
    return (
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden text-gray-400 p-1 hover:text-white">
            <HamburgerSvg />
        </button>
    )
}
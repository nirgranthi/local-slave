import { HamburgerSvg } from "../svg/HamburgerSvg";
import { useState } from "react";

export function SidebarToggleButton() {
    
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 p-1 hover:text-white">
            <HamburgerSvg />
        </button>
    )
}
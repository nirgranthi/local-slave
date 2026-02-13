import { useState } from "react";

export default function ThinkingBlock({children}) {
    const [isThinkingBlockOpen, setIsThinkingBlockOpen] = useState(true)

    return (
        <div className="my-2 border-l-2 border-gray-600 pl-4 py-1" >
            <button
                className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1 mb-1"
                onClick={() => setIsThinkingBlockOpen(!isThinkingBlockOpen)}
            >
                {isThinkingBlockOpen
                    ? '▼ Hide thinking'
                    : '▶ Show thinking'
                }
            </button>
            {isThinkingBlockOpen &&
                <div className="italic text-gray-400 text-sm" >
                    {children}
                </div>
            }
        </div>
    )
}
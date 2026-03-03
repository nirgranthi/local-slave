import { useState } from "react";
import { ShowThinkingButton } from "../Buttons";

export default function ThinkingBlock({children}) {
    const [isThinkingBlockOpen, setIsThinkingBlockOpen] = useState(true)

    return (
        <div className="my-2 border-l-2 border-gray-600 pl-4 py-1" >
            <ShowThinkingButton setIsThinkingBlockOpen={setIsThinkingBlockOpen} isThinkingBlockOpen={isThinkingBlockOpen} />
            {isThinkingBlockOpen &&
                <div className="italic text-gray-400 text-sm" >
                    {children}
                </div>
            }
        </div>
    )
}
import { promptConfigCPF } from "../model/configValues"

export function PromptConfigTab({ selectedTab, promptConfig, setPromptConfig }) {
    const handleInputChangeForPrompt = (key, value) => {
        setPromptConfig(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const promptConfigControlPanel = promptConfigCPF(promptConfig)
    return (
        <div className={`[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-gray-900 border-t border-gray-700 h-64 overflow-y-auto p-4 space-y-3 custom-scrollbar ${selectedTab === 'promptConfigTab' ? '' : 'hidden'}`}>
            {promptConfigControlPanel.map((values) => (
                <div key={values.id} className="flex flex-col space-y-1">
                    <div className="flex py-4 justify-between text-xs text-gray-400 group">
                        <span> {values.label} </span>
                        <div className="-translate-x-1/2 absolute top-1/2 -translate-y-1/2 ml-45 hidden group-hover:block w-48 p-2 bg-gray-900 text-gray-100 text-[10px] leading-relaxed rounded-md shadow-2xl border border-gray-700 pointer-events-none animate-in fade-in slide-in-from-left-1 duration-200">
                            {values.hint || "No hint provided, use your brain."}
                        </div>
                        <span> {values.value} </span>
                        
                    </div>
                    <input
                        type={values.type}
                        min={values.min}
                        max={values.max}
                        step='0.01'
                        value={values.value}
                        onChange={(e) => handleInputChangeForPrompt(values.id, e.target.value)}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>
            ))}
        </div>
    )
}
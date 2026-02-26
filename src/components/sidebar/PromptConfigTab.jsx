

export function PromptConfigTab({selectedTab, promptConfigControlPanel, setPromptConfig}) {
    const handleInputChangeForPrompt = (key, value) => {
        setPromptConfig(prev => ({
            ...prev,
            [key]: value
        }))
    }
    return (
        <div className={`h-64 overflow-y-auto pr-2 space-y-3 custom-scrollbar ${selectedTab === 'promptConfigTab' ? '' : 'hidden'}`}>
            {promptConfigControlPanel.map((values) => (
                <div key={values.id} className="flex flex-col space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span> {values.label} </span>
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
import { modelConfigCPF } from "../model/configValues"

export function ModelConfigTab({ selectedTab, modelConfig, setModelConfig }) {
    const handleInputChangeForModel = (key, value) => {
        setModelConfig(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const modelConfigControlPanel = modelConfigCPF(modelConfig)
    return (
        <div className={`[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-gray-900 border-t border-gray-700 h-64 overflow-y-auto p-4 space-y-3 custom-scrollbar ${selectedTab === 'modelConfigTab' ? '' : 'hidden'}`}>
            {modelConfigControlPanel.map((values) => (
                <div key={values.id} className="flex flex-col space-y-1">
                    <div className="flex py-4 justify-between text-xs text-gray-400 group">
                        <span> {values.label} </span>
                        <div className="-translate-x-1/2 absolute top-1/2 -translate-y-1/2 ml-45 hidden group-hover:block w-48 p-2 bg-gray-900 text-gray-100 text-[10px] leading-relaxed rounded-md shadow-2xl border border-gray-700 pointer-events-none animate-in fade-in slide-in-from-left-1 duration-200">
                            {values.hint || "No hint provided, use your brain."}
                        </div>
                        <span> {values.value} </span>
                        
                    </div>
                    {(values.type === 'range') || (values.type === 'number')
                        ? <input
                            type={values.type}
                            min={values.min}
                            max={values.max}
                            step={values.step}
                            value={values.value}
                            onChange={(e) => handleInputChangeForModel(values.id, e.target.value)}
                            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        : values.type === 'toggle'
                            ? (<div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-300">{values.label}</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={values.value}
                                        onChange={(e) => handleInputChangeForModel(values.id, e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>)
                            : <select
                                value={values.value}
                                onChange={(e) => handleInputChangeForModel(values.id, e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-all"
                            >
                                {values.options.map((option) => (
                                    <option key={option} value={option} className="bg-gray-800" >
                                        {option}
                                    </option>
                                ))}
                            </select>
                    }
                </div>
            ))}
        </div>
    )
}
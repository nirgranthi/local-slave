import { modelConfigCPF } from "../model/configValues"

export function ModelConfigTab({selectedTab, modelConfig, setModelConfig}) {
    const handleInputChangeForModel = (key, value) => {
        setModelConfig(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const modelConfigControlPanel = modelConfigCPF(modelConfig)
    return (
        <div className={`h-64 overflow-y-auto pr-2 space-y-3 custom-scrollbar ${selectedTab === 'modelConfigTab' ? '' : 'hidden'}`}>
            {modelConfigControlPanel.map((values) => (
                <div key={values.id} className="flex flex-col space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span> {values.label} </span>
                        <span> {values.value} </span>
                    </div>
                    {(values.type === 'range') || (values.type === 'number')
                        ? <input
                            type={values.type}
                            min={values.min}
                            max={values.max}
                            step='1'
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
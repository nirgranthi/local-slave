import { useState, useEffect } from "react";
import { TabModelConfigButton } from "./Buttons.jsx";
import { TabPromptConfigButton } from "./Buttons.jsx"
import { promptConfigCPF, modelConfigCPF } from "./model/configValues";

export function ModelConfig({ setIsModelConfigOpen, setPromptConfig, promptConfig, modelConfig, setModelConfig }) {
    const [selectedTab, setSelectedTab] = useState('promptConfigTab')
    const [promptConfigControlPanel, setPromptConfigControlPanel] = useState([])
    const [modelConfigControlPanel, setModelConfigControlPanel] = useState([])

    const tabClassname = (modelsTab) =>
        modelsTab
            ? "flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50"
            : "flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300"

    const handleInputChangeForPrompt = (key, value) => {
        setPromptConfig(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleInputChangeForModel = (key, value) => {
        setModelConfig(prev => ({
            ...prev,
            [key]: value
        }))
    }

    useEffect(() => {
        const inst = promptConfigCPF(promptConfig)
        setPromptConfigControlPanel(inst)
    }, [promptConfig])

    useEffect(() => {
        const inst = modelConfigCPF(modelConfig)
        setModelConfigControlPanel(inst)
    }, [modelConfig])

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 w-full max-w-md p-6 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">


                <button
                    onClick={() => setIsModelConfigOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    X
                </button>

                <h2 className="text-xl font-bold text-white mb-4">Configure Your Model</h2>

                <div className="space-y-4">
                    {/* <p className="text-gray-400 text-sm">Placeholder</p> */}{/* mb reset to default button here and the recommended settings button */}

                    <div className="flex border-b border-gray-700">
                        <TabPromptConfigButton
                            setSelectedTab={setSelectedTab}
                            className={tabClassname(selectedTab === 'promptConfigTab')} />

                        <TabModelConfigButton
                            setSelectedTab={setSelectedTab}
                            className={tabClassname(selectedTab === 'modelConfigTab')} />
                    </div>

                    {/* Prompt Config Tab */}
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

                    {/* Model Config Tab */}
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
                </div>

                <button
                    onClick={() => setIsModelConfigOpen(false)}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                    Done
                </button>
            </div>
        </div>
    );
}
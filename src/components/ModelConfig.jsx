import { useState, useEffect } from "react";
import { TabModelConfigButton } from "./buttons/TabModelConfigButton";
import { TabPromptConfigButton } from "./buttons/TabPromptConfigButton"
import { promptConfigCPF } from "./model/configValues";

export function ModelConfig({ setIsModelConfigOpen, setPromptConfig, promptConfig }) {
    const [selectedTab, setSelectedTab] = useState('promptConfigTab')
    const [promptConfigControlPanel, setPromptConfigControlPanel] = useState([])
    const tabClassname = (modelsTab) =>
        modelsTab
            ? "flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50"
            : "flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300"

    const handleInputChange = (key, value) => {
        setPromptConfig(prev => ({
            ...prev,
            [key]: value
        }))
    }

    useEffect(() => {
        const inst = promptConfigCPF(promptConfig)
        setPromptConfigControlPanel(inst)
    }, [promptConfig, setPromptConfigControlPanel])
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
                    {selectedTab === 'promptConfigTab' &&
                        <div className="h-64 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
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
                                        onChange={(e) => handleInputChange(values.id, e.target.value)}
                                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
                    }
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
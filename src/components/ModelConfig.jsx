import { useState, useEffect } from "react";
import { ModelConfigCloseButton, ModelConfigDoneButton, TabModelConfigButton } from "./Buttons.jsx";
import { TabPromptConfigButton } from "./Buttons.jsx"
import { promptConfigCPF, modelConfigCPF } from "./model/configValues";
import { PromptConfigTab } from "./sidebar/PromptConfigTab.jsx";
import { ModelConfigTab } from "./sidebar/ModelConfigTab.jsx";

export function ModelConfig({ setIsModelConfigOpen, setPromptConfig, promptConfig, modelConfig, setModelConfig }) {
    const [selectedTab, setSelectedTab] = useState('promptConfigTab')
    const [promptConfigControlPanel, setPromptConfigControlPanel] = useState([])
    const [modelConfigControlPanel, setModelConfigControlPanel] = useState([])

    const tabClassname = (modelsTab) =>
        modelsTab
            ? "flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50"
            : "flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300"

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
                {/* <ModelConfigCloseButton setIsModelConfigOpen={setIsModelConfigOpen} /> */}
                <h2 className="text-xl font-bold text-white mb-4">Configure Your Model</h2>
                <div className="space-y-4">
                    {/* <p className="text-gray-400 text-sm">Placeholder</p> */}
                    {/* mb reset to default button here and the recommended settings button */}

                    <div className="flex border-b border-gray-700">
                        <TabPromptConfigButton
                            setSelectedTab={setSelectedTab}
                            className={tabClassname(selectedTab === 'promptConfigTab')} />

                        <TabModelConfigButton
                            setSelectedTab={setSelectedTab}
                            className={tabClassname(selectedTab === 'modelConfigTab')} />
                    </div>

                    <PromptConfigTab
                        selectedTab={selectedTab}
                        promptConfigControlPanel={promptConfigControlPanel}
                        setPromptConfig={setPromptConfig}
                    />
                    <ModelConfigTab
                        selectedTab={selectedTab}
                        modelConfigControlPanel={modelConfigControlPanel}
                        setModelConfig={setModelConfig}
                    />
                </div>
                <ModelConfigDoneButton setIsModelConfigOpen={setIsModelConfigOpen} />
            </div>
        </div>
    );
}
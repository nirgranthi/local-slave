import { useState } from "react";
import { ModelConfigCloseButton, ModelConfigDoneButton, TabModelConfigButton } from "./Buttons.jsx";
import { TabPromptConfigButton } from "./Buttons.jsx"
import { PromptConfigTab } from "./sidebar/PromptConfigTab.jsx";
import { ModelConfigTab } from "./sidebar/ModelConfigTab.jsx";
import { AutoFixSvg } from "./SVGs.jsx";

export function ModelConfig({ setIsModelConfigOpen, setPromptConfig, promptConfig, modelConfig, setModelConfig, setIsRecommended, setReloadModel }) {
    const [selectedTab, setSelectedTab] = useState('promptConfigTab')

    const tabClassname = (modelsTab) =>
        modelsTab
            ? "flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50"
            : "flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300"

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 w-full max-w-md p-6 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <ModelConfigCloseButton setIsModelConfigOpen={setIsModelConfigOpen} />
                <h2 className="text-xl font-bold text-white mb-4">Configure Your Model</h2>
                <div className="space-y-4">
                    {/* <p className="text-gray-400 text-sm">Placeholder</p> */}
                    {/* recommended settings button */}
                    <div className="flex items-center justify-between p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl group hover:border-blue-500/30 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                <AutoFixSvg/>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white leading-none">Recommended Mode</h4>
                                <p className="text-[10px] text-gray-500 mt-1">Most optimal settings</p>
                            </div>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                onChange={() => setIsRecommended(prev => !prev)}
                                defaultChecked
                            />
                            <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-5 rtl:peer-checked:after:-translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500 peer-checked:after:bg-white"></div>
                        </label>
                    </div>

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
                        promptConfig={promptConfig}
                        setPromptConfig={setPromptConfig}
                    />
                    <ModelConfigTab
                        selectedTab={selectedTab}
                        modelConfig={modelConfig}
                        setModelConfig={setModelConfig}
                    />
                </div>
                <ModelConfigDoneButton selectedTab={selectedTab} setIsModelConfigOpen={setIsModelConfigOpen} setReloadModel={setReloadModel} />
            </div>
        </div>
    );
}
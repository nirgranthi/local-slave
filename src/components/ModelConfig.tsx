import { useState } from "react";
import { ModelConfigCloseButton, ModelConfigDoneButton, RecommendedButton, TabModelConfigButton } from "./Buttons.jsx";
import { TabPromptConfigButton } from "./Buttons.jsx"
import { PromptConfigTab } from "./sidebar/PromptConfigTab.jsx";
import { ModelConfigTab } from "./sidebar/ModelConfigTab.jsx";

export function ModelConfig() {
    const [selectedTab, setSelectedTab] = useState<string>('promptConfigTab')

    const tabClassname = (modelsTab: boolean) =>
        modelsTab
            ? "flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50"
            : "flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300"

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 w-full max-w-md p-6 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <ModelConfigCloseButton />
                <h2 className="text-xl font-bold text-white mb-4">Configure Your Model</h2>
                <div className="space-y-4">
                    <RecommendedButton />
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
                    />
                    <ModelConfigTab
                        selectedTab={selectedTab}
                    />
                </div>
                <ModelConfigDoneButton selectedTab={selectedTab} />
            </div>
        </div>
    );
}
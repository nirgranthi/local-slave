import React, { createContext, RefObject, useContext, useRef, useState } from "react";
import friendlyPrompt from '/systemPrompts/friendlyPrompt.txt?raw'

import type { chatMessagesProps, modelConfigDefaultProps, progressDetail, promptConfigDefaultProps } from "./types";
import { modelConfigDefault, promptConfigDefault } from "./model/configValues";

interface StateContextProps {
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    uploadedModel: File | null,
    setUploadedModel: React.Dispatch<React.SetStateAction<File | null>>,
    userPrompt: string,
    setUserPrompt: React.Dispatch<React.SetStateAction<string>>,
    chatMessages: chatMessagesProps[],
    setChatMessages: React.Dispatch<React.SetStateAction<chatMessagesProps[]>>,
    liveToken: string,
    setLiveToken: React.Dispatch<React.SetStateAction<string>>,
    isLiveTokenLive: boolean,
    setIsLiveTokenLive: React.Dispatch<React.SetStateAction<boolean>>,
    modelStatus: string,
    setModelStatus: React.Dispatch<React.SetStateAction<string>>,
    selectedModelUrl: string | null,
    setSelectedModelUrl: React.Dispatch<React.SetStateAction<string | null>>,
    isModelDownloading: boolean,
    setIsModelDownloading: React.Dispatch<React.SetStateAction<boolean>>,
    loadedModelName: string,
    setLoadedModelName: React.Dispatch<React.SetStateAction<string>>,
    isModelConfigOpen: boolean,
    setIsModelConfigOpen: React.Dispatch<React.SetStateAction<boolean>>,
    promptConfig: promptConfigDefaultProps,
    setPromptConfig: React.Dispatch<React.SetStateAction<promptConfigDefaultProps>>,
    modelConfig: modelConfigDefaultProps,
    setModelConfig: React.Dispatch<React.SetStateAction<modelConfigDefaultProps>>,
    activeDownloads: Record<string, progressDetail>,
    setActiveDownloads: React.Dispatch<React.SetStateAction<Record<string, progressDetail>>>,
    isRecommended: boolean,
    setIsRecommended: React.Dispatch<React.SetStateAction<boolean>>,
    reloadModel: number,
    setReloadModel: React.Dispatch<React.SetStateAction<number>>,
    systemPrompt: string,
    setSystemPrompt: React.Dispatch<React.SetStateAction<string>>,
    currentSessionId: number | null,
    setCurrentSessionId: React.Dispatch<React.SetStateAction<number | null>>,
    stopModelReplyRef: RefObject<AbortController | null>,
    tps: number | null,
    setTps: React.Dispatch<React.SetStateAction<number | null>>
}

const StateContext = createContext<StateContextProps | undefined>(undefined)

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [uploadedModel, setUploadedModel] = useState<File | null>(null)
    const [userPrompt, setUserPrompt] = useState<string>('')
    const [chatMessages, setChatMessages] = useState<chatMessagesProps[]>([])
    const [liveToken, setLiveToken] = useState<string>('')
    const [isLiveTokenLive, setIsLiveTokenLive] = useState<boolean>(false)
    const [modelStatus, setModelStatus] = useState<string>('OFFLINE')
    const [selectedModelUrl, setSelectedModelUrl] = useState<string | null>(null)
    const [isModelDownloading, setIsModelDownloading] = useState<boolean>(false)
    const [loadedModelName, setLoadedModelName] = useState<string>('No Model Loaded')
    const [isModelConfigOpen, setIsModelConfigOpen] = useState<boolean>(false)
    const [promptConfig, setPromptConfig] = useState<promptConfigDefaultProps>(promptConfigDefault)
    const [modelConfig, setModelConfig] = useState<modelConfigDefaultProps>(modelConfigDefault)
    const [activeDownloads, setActiveDownloads] = useState<Record<string, progressDetail>>({})
    const [isRecommended, setIsRecommended] = useState<boolean>(false)
    const [reloadModel, setReloadModel] = useState<number>(1)
    const [systemPrompt, setSystemPrompt] = useState<string>(friendlyPrompt)
    const [currentSessionId, setCurrentSessionId] = useState<number | null>(null)
    const stopModelReplyRef = useRef<AbortController>(null)
    const [tps, setTps] = useState<number | null>(null)

    return (
        <StateContext.Provider value={{
            isSidebarOpen,
            setIsSidebarOpen,
            uploadedModel,
            setUploadedModel,
            userPrompt,
            setUserPrompt,
            chatMessages,
            setChatMessages,
            liveToken,
            setLiveToken,
            isLiveTokenLive,
            setIsLiveTokenLive,
            modelStatus,
            setModelStatus,
            selectedModelUrl,
            setSelectedModelUrl,
            isModelDownloading,
            setIsModelDownloading,
            loadedModelName,
            setLoadedModelName,
            isModelConfigOpen,
            setIsModelConfigOpen,
            promptConfig,
            setPromptConfig,
            modelConfig,
            setModelConfig,
            activeDownloads,
            setActiveDownloads,
            isRecommended,
            setIsRecommended,
            reloadModel,
            setReloadModel,
            systemPrompt,
            setSystemPrompt,
            currentSessionId,
            setCurrentSessionId,
            stopModelReplyRef,
            tps,
            setTps
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStates = () => {
    const context = useContext(StateContext)
    if (!context) throw new Error ("useStates must be used within StateProvider")
    return context
}
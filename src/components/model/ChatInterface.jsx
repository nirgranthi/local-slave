import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks';
import { LoadingAnimation } from './LoadingAnimation';
import ThinkingBlock from './ThinkingBlock';
import { customComponents } from './CustomComponentsForMD';

export function ChatInterface({ sender, message, liveToken, isLiveTokenLive }) {
    const splitThinkingBlock = (content) => {
        if (!content) return null

        const thoughtBlock = content.split(/(<think>[\s\S]*?<\/think>|<think>[\s\S]*?$)/g)

        return thoughtBlock.map((part, index) => {
            if (part.startsWith('<think>')) {
                const thought = part.replace('<think>', '').replace('</think>', '')
                return (
                    <ThinkingBlock key={index}>
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                            {thought}
                        </ReactMarkdown>
                    </ThinkingBlock>
                )
            } else if (part.trim()) {
                return (
                    <ReactMarkdown
                        key={index}
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={customComponents}
                    >
                        {part}
                    </ReactMarkdown>
                )
            }
            return null
        })
    };

    const displayContent = isLiveTokenLive ? liveToken : message
    return (
        <div className={`flex w-full mb-4 ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-md prose prose-invert prose-sm overflow-x-auto wrap-break-words
                ${sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                }`}
            >
                {isLiveTokenLive && !liveToken
                    ? <LoadingAnimation />
                    : splitThinkingBlock(displayContent)
                }
            </div>
        </div>
    )
}
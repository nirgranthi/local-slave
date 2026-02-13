import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks';
import { LoadingAnimation } from './LoadingAnimation';
import CodeBlock from './CodeBlock';
import ThinkingBlock from './ThinkingBlock';

export function ChatInterface({ sender, message, liveToken, isLiveTokenLive }) {
    const customComponents = {
        code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (match) {
                return (
                    <CodeBlock
                        language={match[1]}
                        value={String(children).replace(/\n$/, '')}
                        {...props}
                    />
                )
            }
            return (
                <code className="bg-black/30 px-1 rounded text-pink-400" {...props}>
                    {children}
                </code>
            )
        },

        table: ({ children }) => (
            <div className="overflow-x-auto my-4 border border-gray-700 rounded-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    {children}
                </table>
            </div>
        ),

        thead: ({ children }) => (
            <thead className='bg-gray-900/80' >
                {children}
            </thead>
        ),

        th: ({ children }) => (
            <th className='px-4 py-2 text-left font-semibold text-gray-100 border-r border-gray-700 last:border-r-0' >
                {children}
            </th>
        ),

        td: ({ children }) => (
            <td className="px-4 py-2 border-t border-r border-gray-700 text-gray-300 last:border-r-0" >
                {children}
            </td>
        ),
        
        tr: ({ children }) => (
            <tr className="even:bg-gray-800/30" >
                {children}
            </tr>
        )
    }

    const splitThinkingBlock = (content) => {
        if (!content) return null

        const thoughtBlock = content.split(/(<think>[\s\S]*?<\/think>|<think>[\s\S]*?$)/g);

        return thoughtBlock.map((part, index) => {
            if (part.startsWith('<think>')) {
                const thought = part.replace('<think>', '').replace('</think>', '');
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

    const displayContent = isLiveTokenLive ? liveToken : message;
    return (
        <div className={`flex w-full mb-4 ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-md prose prose-invert prose-sm
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
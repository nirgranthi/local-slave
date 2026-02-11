import { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks';
import { LoadingAnimation } from './LoadingAnimation';

export function ChatInterface({ sender, message, liveToken, isLiveTokenLive }) {
    return (
        <>
            <div className={`flex w-full ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[60%] px-4 py-2 rounded-2xl text-sm shadow-md
                    ${sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                    } prose prose-invert prose-sm`}
                >
                    {isLiveTokenLive && !liveToken
                        ? <LoadingAnimation />
                        : (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkBreaks]}
                                components={{
                                    code({ className, children, node, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');

                                        if (match) {
                                            return (
                                                <CodeBlock language={match ? match[1] : ''} value={String(children).replace(/\n$/, '')} {...props} />
                                            )
                                        }
                                        return (
                                            <code className="bg-black/30 px-1 rounded text-pink-400" {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {isLiveTokenLive
                                    ? liveToken
                                    : message
                                }
                            </ReactMarkdown>
                        )
                    }
                </div>
            </div>
        </>
    )
}

function CodeBlock({ language, value }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        console.log('code block copied')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000 )
    }

    return (
        <div className="relative group my-4 rounded-lg overflow-hidden border border-gray-700">
            <div className="flex justify-between items-center px-4 py-1.5 bg-gray-900 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                <span>
                    {language || 'code'}
                </span>

                <button
                    onClick={handleCopy}
                    className="hover:text-white transition-colors flex items-center gap-1"
                >
                    {copied ? (
                        <span className="text-green-400">Copied!</span>
                    ) : (
                        <span>Copy</span>
                    )}
                </button>
            </div>
            <pre className="m-0 p-4 bg-black/50 overflow-x-auto custom-scrollbar">
                <code className="text-gray-300 leading-relaxed">
                    {value}
                </code>
            </pre>
        </div>
    )
}
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks';
import { LoadingAnimation } from './LoadingAnimation';
import CodeBlock from './CodeBlock';

export function ChatInterface({ sender, message, liveToken, isLiveTokenLive }) {
    return (
        <>
            <div className={`flex w-full ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[60%] px-4 py-2 rounded-2xl text-sm shadow-md prose prose-invert prose-sm
                    ${sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                    }`}
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
                                    },

                                    table: ({ children }) => (
                                        <div>
                                            <table>
                                                {children}
                                            </table>
                                        </div>
                                    ),

                                    thead: ({ children }) => (
                                        <thead className='bg-gray-900/80 border-b border-gray-700' >
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
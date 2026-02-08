import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function ChatInterface({ sender, message, liveToken, isLiveTokenLive }) {
    return (
        <>
            <div className={`flex w-full ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-md
                ${sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                    } prose prose-invert prose-sm max-w-none`}
                >
                    <ReactMarkdown remarkPlugins={remarkGfm} >
                        {isLiveTokenLive
                            ? (liveToken || '...')
                            : message
                        }
                    </ReactMarkdown>
                </div>
            </div>
        </>
    )
}
import { useState } from "react"

export function UploadedModelUrlList({ setSelectedModelUrl }) {
    const [userModelUrl, setUserModelUrl] = useState('')
    const [UploadedModelUrls, setUploadedModelUrls] = useState([])

    const sendMessage = () => {
        if (!userModelUrl.trim()) return;

        setSelectedModelUrl(userModelUrl)
        if (!UploadedModelUrls.includes(userModelUrl)) {
            setUploadedModelUrls(prev => [...prev, userModelUrl])
        }
        setUserModelUrl('')
    }
    return (
        <div className="w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 bg-green-900/20 border-green-800 hover:bg-green-900/40">
            <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-white text-xs font-medium placeholder-gray-500"
                placeholder="Paste GGUF model URL here..."
                onChange={(e) => setUserModelUrl(e.target.value)}
                value={userModelUrl}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
            />

            <div className="flex justify-between items-center mt-1 pointer-events-none">
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium text-[10px] text-gray-400 truncate">
                        {userModelUrl ? userModelUrl.split('/').pop() : ''}
                    </span>
                </div>
            </div>

            {UploadedModelUrls.map((url, index) => (
                <button key={index}
                    className='w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 bg-green-900/20 border-green-800 hover:bg-green-900/40'
                    onClick={() => (setSelectedModelUrl(url))}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="font-medium text-xs text-gray-300 group-hover:text-white truncate">{url.split('/').pop()}</span>
                        </div>
                    </div>
                </button>
            ))}

        </div>
    )
}
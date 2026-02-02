import { useState } from "react"

export function UploadedModelList({ setSelectedModelUrl }) {
    const [userModelUrl, setUserModelUrl] = useState('')
    const sendMessage = () => { setSelectedModelUrl(userModelUrl), setUserModelUrl('') }
    return (
        <input
            type="text"
            className='w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 bg-green-900/20 border-green-800 hover:bg-green-900/40'
            onChange={(e) => setUserModelUrl(e.target.value)}
            value={userModelUrl}
            onKeyDown={(e) => { if (e.key == 'Enter') (sendMessage()) }}
        >
            <div className="flex justify-between items-center">
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium text-xs text-gray-300 group-hover:text-white truncate">
                        {userModelUrl.split('/').pop()}
                    </span>
                    <span className="text-[9px] text-green-400">
                        Available offline
                    </span>
                </div>
            </div>
        </input>
    )
}
export function ChatInterface({ sender, message }) {
    return (
        <>
            <div className={`flex w-full ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-md
                ${sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                    }`}>
                    {message}
                </div>
            </div>
        </>
    )
}
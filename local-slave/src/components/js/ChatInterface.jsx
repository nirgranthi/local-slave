export function ChatInterface({ sender, message }) {
    return (
        <>
            <div className={
                sender === 'user'
                    ? ''
                    : ''
            }>
                <div>
                    {message}
                </div>
            </div>
        </>
    )
}
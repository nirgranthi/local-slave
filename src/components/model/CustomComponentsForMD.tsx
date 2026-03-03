import CodeBlock from "./CodeBlock";

export const customComponents = {
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
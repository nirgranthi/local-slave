import { CopyCodeBlockButton } from "../Buttons"


export default function CodeBlock({ language, value }) {
    

    return (
        <div className="relative group my-4 rounded-lg overflow-hidden border border-gray-700">
            <div className="flex justify-between items-center px-4 py-1.5 bg-gray-900 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                <span>
                    {language || 'code'}
                </span>
                <CopyCodeBlockButton value={value} />
            </div>
            <pre className="m-0 p-4 bg-black/50 overflow-x-auto custom-scrollbar">
                <code className="text-gray-300 leading-relaxed">
                    {value}
                </code>
            </pre>
        </div>
    )
}
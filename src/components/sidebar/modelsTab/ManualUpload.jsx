import { useState } from "react"
import { UploadSvg } from "../../svg/UploadSvg.jsx"


export function ManualUpload({ setUploadedModel }) {
  const [uploadedModelFiles, setUploadedModelFiles] = useState([])
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedModel(file)
      console.log('file uploaded', file.name)
      if (!uploadedModelFiles.includes(file)) {
        setUploadedModelFiles(prev => [...prev, file])
      }
    }
  }
  return (
    <div className="border-t border-gray-700 pt-4">
      <div className="text-xs text-gray-400 uppercase font-bold mb-2">Manual Upload</div>
      <label
        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 hover:border-blue-500 transition-colors bg-gray-800/50">

        <div className="flex flex-col items-center justify-center pt-2 pb-3">
          <UploadSvg />
          <p className="text-[10px] text-gray-400">Tap to Select .gguf</p>
        </div>

        <input
          type="file"
          id="file-upload"
          accept=".gguf"
          onChange={handleFile}
          className="hidden" />

      </label>

      {uploadedModelFiles.map((file, index) => (
        <button key={index}
          className='w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 bg-green-900/20 border-green-800 hover:bg-green-900/40'
          onClick={() => (setUploadedModel(file))}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-medium text-xs text-gray-300 group-hover:text-white truncate">{file.name}</span>
            </div>
          </div>
        </button>
      ))}

    </div>
  )
}
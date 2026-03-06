import { InputEventHandler, useState } from "react"
import { UploadSvg } from "../../SVGs.jsx"
import { UploadedModelFilesButton } from "../../Buttons.jsx"
import { useStates } from "../../Context.js"


export function ManualUpload() {
  const {setUploadedModel } = useStates()

  const [uploadedModelFiles, setUploadedModelFiles] = useState<File[]>([])
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const file = files[0]
    if (file) {
      setUploadedModel(file)
      if (!uploadedModelFiles.includes(file)) {
        setUploadedModelFiles(prev => [...prev, file])
      }
    }
  }
  return (
    <div className="border-t border-gray-700 pt-4">
      <div className="text-xs text-gray-400 uppercase font-bold mb-2">Manual Upload</div>
      <label
        className="flex flex-col mb-1 items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 hover:border-blue-500 transition-colors bg-gray-800/50">

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
        <UploadedModelFilesButton key={index} file={file} />
      ))}

    </div>
  )
}
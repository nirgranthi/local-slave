export function ManualUpload() {
    return (
        <div className="border-t border-gray-700 pt-4">
              <div className="text-xs text-gray-400 uppercase font-bold mb-2">Manual Upload</div>
              <label
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 hover:border-blue-500 transition-colors bg-gray-800/50">
                <div className="flex flex-col items-center justify-center pt-2 pb-3">
                  <svg className="w-6 h-6 mb-1 text-gray-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                    </path>
                  </svg>
                  <p className="text-[10px] text-gray-400">Tap to Select .gguf</p>
                </div>
                <input type="file" id="file-upload" accept=".gguf" className="hidden" />
              </label>
            </div>
    )
}
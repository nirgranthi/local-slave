export function DownloadProgressBar({ dlPercent, dlDetails, activeDownloads }) {
  const downloads = Object.entries(activeDownloads)
  return (
    downloads.map((download, i) => (
      <div key={i} className="bg-gray-900 rounded-lg p-3 border border-gray-700 mt-auto" >
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-blue-300">Downloading...</span>
          <span className="text-white font-mono">
            {`${download[1].progress}%`}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div className="bg-blue-500 h-1.5 rounded-full progress-bar" style={{ width: `${download[1].progress}%` }} ></div>
        </div>
        <div className="text-[9px] text-gray-500 mt-1 text-right font-mono">
          {download[1].detail}
        </div>
      </div >
    ))
  )
}
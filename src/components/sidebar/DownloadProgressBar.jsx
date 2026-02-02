export function DownloadProgressBar({ dlPercent, dlDetails }) {

  return (
    <div id="dl-progress-container" className="bg-gray-900 rounded-lg p-3 border border-gray-700 mt-auto">
      <div className="flex justify-between text-[10px] mb-1">
        <span className="text-blue-300">Downloading...</span>
        <span id="dl-percent" className="text-white font-mono">
          {`${dlPercent}%`}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div id="dl-bar" className="bg-blue-500 h-1.5 rounded-full progress-bar" style={{ width: `${dlPercent}%` }} ></div>
      </div>
      <div id="dl-details" className="text-[9px] text-gray-500 mt-1 text-right font-mono">
        {dlDetails}
      </div>
    </div>
  )
}
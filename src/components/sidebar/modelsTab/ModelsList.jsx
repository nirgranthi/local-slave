import { RefreshAvailableModelsButton } from "../../buttons/RefreshAvailableModelsButton"
import { useState, useEffect } from "react"
import axios from "axios"

const getModelName = (url) => {
  return url.split('/').pop()
}

const LoadingList = () =>
(<div className="text-xs text-gray-600 italic text-center py-4">
  Loading list...
</div>)

const LoadedList = ({ csvData, setSelectedModelUrl }) => {
  const isDownloaded = false
  return (
    csvData.map((model, index) => (
      <button key={index}
        className={`w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 
                ${isDownloaded
            ? 'bg-green-900/20 border-green-800 hover:bg-green-900/40'
            : 'bg-gray-700/30 border-gray-700/50 hover:bg-gray-700'}`}
        onClick={() => (setSelectedModelUrl(model[0]))}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-medium text-xs text-gray-300 group-hover:text-white truncate">{getModelName(model[0])}</span>
            {isDownloaded ? '<span class="text-[9px] text-green-400">Available offline</span>' : ''}
          </div>
          <span className="text-[10px] text-gray-500 bg-black/20 px-1.5 py-0.5 rounded whitespace-nowrap">{model[1]} MB</span>
        </div>
      </button>
    ))
  )
}

export function ModelsList({ setSelectedModelUrl }) {
  const [isloadingCsv, setIsLoadingCsv] = useState(true)
  const [csvData, setCsvData] = useState([])
  const [refresh, setRefresh] = useState('refreshed')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/models.csv');
        const parsedData = response.data
          .split('\n')
          .map(row => row.split(','))
          .filter(row => row.length > 1);

        setIsLoadingCsv(false)
        setCsvData(parsedData)
        console.log(refresh)
        setRefresh('refreshed')
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [refresh])

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-400 uppercase font-bold">
          Available Models
        </div>
        <RefreshAvailableModelsButton setRefresh={setRefresh} />
      </div>
      <div id="csv-model-list" className="space-y-2">
        {isloadingCsv && <LoadingList />}
        {!isloadingCsv &&
          <LoadedList csvData={csvData} setSelectedModelUrl={setSelectedModelUrl} />
        }
      </div>
    </div>
  )
}
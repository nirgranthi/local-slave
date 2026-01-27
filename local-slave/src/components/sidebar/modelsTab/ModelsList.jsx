import { RefreshAvailableModelsButton } from "../../buttons/RefreshAvailableModelsButton"
import { useState, useEffect } from "react"
import axios from "axios"

export function ModelsList() {
  const [isloadingCsv, setIsLoadingCsv] = useState(true)
  const [csvData, setCsvData] = useState([])
  //const [csvError, setCsvError] = useState(null)
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

      } catch (error) {
        console.log(error)
      }

    }
    fetchData();
  }, [])

  const LoadingList = () => 
    (<div className="text-xs text-gray-600 italic text-center py-4">
      Loading list...
    </div>)
  

  const LoadedList = () => {

  }
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-400 uppercase font-bold">
          Available Models
        </div>
        <RefreshAvailableModelsButton />
      </div>
      <div id="csv-model-list" className="space-y-2">
        {isloadingCsv && <LoadingList />}
        {!isloadingCsv && 
          csvData.map((model) => (
             <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="font-medium text-xs text-gray-300 group-hover:text-white">{model[0]}</span>
                        {/* {isDownloaded ? '<span class="text-[9px] text-green-400">Available offline</span>' : ''} */}
                    </div>
                    <span className="text-[10px] text-gray-500 bg-black/20 px-1.5 py-0.5 rounded">{model[1]} MB</span>
                </div>
          ))
        }
      </div>
    </div>
  )
}
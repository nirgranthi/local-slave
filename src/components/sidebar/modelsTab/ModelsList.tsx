import { RefreshAvailableModelsButton, RenderCsvModelsButton } from "../../Buttons.jsx"
import { useState, useEffect } from "react"
import axios from "axios"
import { UploadedModelUrlList } from "./UploadedModelUrlList.jsx"
import { useStates } from "../../Context.js"


export function ModelsList() {
  const [isloadingCsv, setIsLoadingCsv] = useState(true)
  const [csvData, setCsvData] = useState<string[][]>([])
  const [refresh, setRefresh] = useState('refreshed')

  const LoadedList = () => {
    const { setSelectedModelUrl } = useStates()
    return (
      csvData.map((model, index) => (
        <RenderCsvModelsButton key={index} model={model} setSelectedModelUrl={setSelectedModelUrl} />
      ))
    )
  }

  const LoadingList = () => (<div className="text-xs text-gray-600 italic text-center py-4">Loading list...</div>)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<string>('/models.csv');
        const parsedData = response.data
          .split('\n')
          .map(row => row.split(','))
          .filter(row => row.length > 1);

        setIsLoadingCsv(false)
        /* console.log(parsedData) */
        setCsvData(parsedData)
        /* console.log(refresh) */
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
        <div className="text-xs text-gray-400 uppercase font-bold">Available Models</div>
        <RefreshAvailableModelsButton setRefresh={setRefresh} />
      </div>
      <div className="space-y-2">
        {isloadingCsv && <LoadingList />}
        {!isloadingCsv && <LoadedList />}

        <UploadedModelUrlList />

      </div>
    </div>
  )
}
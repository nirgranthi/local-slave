import { RefreshAvailableModelsButton, RenderCsvModelsButton } from "../../Buttons.jsx"
import { useState, useEffect } from "react"
import axios from "axios"
import { UploadedModelUrlList } from "./UploadedModelUrlList.jsx"



const LoadingList = () =>
(<div className="text-xs text-gray-600 italic text-center py-4">
  Loading list...
</div>)



const LoadedList = ({ csvData, setSelectedModelUrl }) => {
  return (
    csvData.map((model, index) => (
      <RenderCsvModelsButton key={index} model={model} setSelectedModelUrl={setSelectedModelUrl} />
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
        <div className="text-xs text-gray-400 uppercase font-bold">
          Available Models
        </div>
        <RefreshAvailableModelsButton setRefresh={setRefresh} />
      </div>
      <div className="space-y-2">
        {isloadingCsv && <LoadingList />}
        {!isloadingCsv &&
          <LoadedList csvData={csvData} setSelectedModelUrl={setSelectedModelUrl} />
        }

        <UploadedModelUrlList setSelectedModelUrl={setSelectedModelUrl} />

      </div>
    </div>
  )
}
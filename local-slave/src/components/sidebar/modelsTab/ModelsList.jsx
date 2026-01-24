export function ModelsList() {
    return (
        <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-gray-400 uppercase font-bold">Available Models</div>
                <button onClick={loadModelList}
                  className="text-[10px] text-blue-400 hover:underline">Refresh</button>
              </div>
              <div id="csv-model-list" className="space-y-2">
                <div className="text-xs text-gray-600 italic text-center py-4">Loading list...</div>
              </div>
            </div>
    )
}
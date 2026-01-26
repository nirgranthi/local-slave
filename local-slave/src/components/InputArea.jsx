import { SendButton } from "./buttons/SendButton";

export function InputArea() {
    return (
        <div className="absolute bottom-0 w-full bg-gray-900 pt-4 pb-4 px-4 border-t border-gray-800">
          <div className="max-w-3xl mx-auto relative flex gap-2">
            <input id="user-input" type="text"
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Load a model to start..." />
            <SendButton />
          </div>
        </div>
    )
}
import { useState } from "react";

const InputBox = ({ placeholder, label, onDropFunction }) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropped, setIsDropped] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const columnName = event.dataTransfer.getData("text/plain");
    setInputValue(columnName);
    setIsDropped(true);
    if (onDropFunction) {
      onDropFunction(columnName);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClearInput = () => {
    setInputValue("");
    setIsDropped(false);
  };

  return (
    <div className="relative flex items-center justify-between gap-3 w-1/3">
      <label className="text-xl">{label}</label>
      <div className="relative w-3/4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          placeholder={placeholder}
          className={`w-full py-2 px-3 rounded-lg border focus:outline-none focus:border-blue-500 ${
            isDropped ? "border-green-400 shadow-sm text-green-400" : ""
          }`}
        />
      </div>
      {inputValue && (
        <button
          onClick={handleClearInput}
          className="absolute inset-y-0 right-0 flex items-center justify-center px-4 bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-r-lg font-semibold"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default InputBox;

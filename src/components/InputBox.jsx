import React, { useState, useEffect } from "react";

const InputBox = ({
  placeholder,
  label,
  onDropFunction,
  value,
  notValidInputMessage,
  clearInput,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleDrop = (event) => {
    event.preventDefault();
    const columnName = event.dataTransfer.getData("text/plain");
    setInputValue(columnName);
    if (onDropFunction) {
      onDropFunction(columnName);
    }
  };

  const handleClearInput = () => {
    setInputValue("");
    clearInput();
  };

  const inputClassName = `w-full py-2 px-3 shadow-sm rounded-lg border focus:outline-none focus:border-blue-500 font-bold ${
    notValidInputMessage
      ? "border-red-400 text-red-400"
      : "border-green-400 text-green-400"
  }`;

  return (
    <>
      <div className="relative flex items-center justify-between gap-3 w-1/3">
        <label className="text-xl">{label}:</label>
        <div className="relative w-3/4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            placeholder={placeholder}
            className={inputClassName}
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
      {notValidInputMessage && (
        <p className="text-red-500 text-sm">{notValidInputMessage}</p>
      )}
    </>
  );
};

export default InputBox;

import { useState, useEffect } from "react";

const InputBox = ({
  placeholder,
  label,
  onDropFunction,
  value,
  notValidInputMessage,
  clearInput,
  identifier,
}) => {
  // State to manage input value
  const [inputValue, setInputValue] = useState(value);

  // Update input value when the external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle dropping of text/plain data
  const handleDrop = (event) => {
    event.preventDefault();
    const columnName = event.dataTransfer.getData("text/plain");
    setInputValue(columnName);
    // Invoke callback function if provided
    if (onDropFunction) {
      onDropFunction(columnName);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle clearing input
  const handleClearInput = () => {
    setInputValue("");
    clearInput(identifier);
  };

  // Determine input class based on validity
  const inputClassName = `w-full py-2 px-3 shadow-sm rounded-lg border focus:outline-none focus:border-blue-500 font-bold ${
    notValidInputMessage ? "border-red-400 text-red-400" : "text-inherit"
  }`;

  // Render the InputBox component
  return (
    <>
      <div className="relative md:w-2/3 flex flex-col md:flex-row items-center justify-between gap-3">
        <label className="text-xl">{label}:</label>
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            placeholder={placeholder}
            className={inputClassName}
          />
          {/* Show clear button if input value is not empty */}
          {inputValue && (
            <button
              onClick={handleClearInput}
              className="absolute inset-y-0 right-0 md:flex md:items-center justify-center px-4 bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-r-lg font-semibold"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      {/* Show error message if not valid */}
      {notValidInputMessage && (
        <p className="text-red-500 text-sm">{notValidInputMessage}</p>
      )}
    </>
  );
};

export default InputBox;

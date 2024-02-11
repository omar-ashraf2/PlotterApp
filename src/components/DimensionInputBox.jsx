import InputBox from "./InputBox";

const DimensionInputBox = ({
  selectedDimension,
  dimensionErrorMessage,
  onDimensionChange,
  clearDimensionInput,
  onInputChange,
}) => {
  return (
    <InputBox
      label="Dimension"
      placeholder="Drag and Drop a Dimension"
      value={selectedDimension}
      notValidInputMessage={dimensionErrorMessage}
      clearInput={clearDimensionInput}
      onInputChange={onInputChange}
      onDropFunction={(value) => onDimensionChange(value)}
    />
  );
};

export default DimensionInputBox;

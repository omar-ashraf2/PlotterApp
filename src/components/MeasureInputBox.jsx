import InputBox from "./InputBox";

const MeasureInputBox = ({
  selectedMeasure,
  measureErrorMessage,
  onMeasureChange,
  clearMeasureInput,
  onInputChange,
}) => {
  return (
    <InputBox
      label="Measure"
      placeholder="Drag and Drop a Measure"
      value={selectedMeasure}
      notValidInputMessage={measureErrorMessage}
      clearInput={clearMeasureInput}
      onInputChange={onInputChange}
      onDropFunction={(value) => onMeasureChange(value)}
    />
  );
};

export default MeasureInputBox;

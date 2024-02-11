import { useState, useEffect } from "react";
import { fetchChartData } from "../api/api";
import InputBox from "./InputBox";
import ChartContent from "./ChartContent";
import Loader from "./Loader";

const Chart = ({ columns }) => {
  const [selectedDimension, setSelectedDimension] = useState("");
  const [selectedMeasure, setSelectedMeasure] = useState("");
  const [chartData, setChartData] = useState([]);
  const [dimensionErrorMessage, setDimensionErrorMessage] = useState("");
  const [measureErrorMessage, setMeasureErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedDimension, selectedMeasure]);

  const fetchData = async () => {
    setError(null);
    setDimensionErrorMessage("");
    setMeasureErrorMessage("");

    if (!selectedDimension || !selectedMeasure) return;

    const selectedDimensionColumn = columns.find(
      (column) => column.name === selectedDimension
    );
    const selectedMeasureColumn = columns.find(
      (column) => column.name === selectedMeasure
    );

    if (selectedDimensionColumn?.function !== "dimension") {
      setDimensionErrorMessage("The input is not a valid dimension");
      return;
    }

    if (selectedMeasureColumn?.function !== "measure") {
      setMeasureErrorMessage("The input is not a valid measure");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchChartData([selectedMeasure], selectedDimension);
      if (data) {
        const actualValues = data.data[0].values.map((value, index) => ({
          [selectedDimension]: value,
          [selectedMeasure]: data.data[1].values[index],
        }));
        setChartData(actualValues);
      }
    } catch (error) {
      setError(`Error fetching chart data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const clearInputFields = () => {
    setSelectedDimension("");
    setSelectedMeasure("");
    setChartData([]);
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (error || dimensionErrorMessage || measureErrorMessage) {
      return (
        <h1 className="text-center text-gray-500 text-3xl">
          {error || dimensionErrorMessage || measureErrorMessage}
        </h1>
      );
    }

    if (chartData.length) {
      return (
        <ChartContent
          chartData={chartData}
          selectedDimension={selectedDimension}
          selectedMeasure={selectedMeasure}
        />
      );
    }

    return (
      <h1 className="text-center text-gray-500 text-3xl">
        Please drag and drop a valid dimension and measurement.
      </h1>
    );
  };

  return (
    <div className="flex-[0.9] h-full flex flex-col justify-between items-center gap-28 mt-10">
      <div className="w-full flex flex-col items-center gap-5">
        {/* Dimension InputBox */}
        <InputBox
          label="Dimension"
          placeholder="Drag and Drop a Dimension"
          onDropFunction={setSelectedDimension}
          value={selectedDimension}
          notValidInputMessage={dimensionErrorMessage}
          clearInput={clearInputFields}
        />
        {/* Measure InputBox */}
        <InputBox
          label="Measure"
          placeholder="Drag and Drop a Measure"
          onDropFunction={setSelectedMeasure}
          value={selectedMeasure}
          notValidInputMessage={measureErrorMessage}
          clearInput={clearInputFields}
        />
      </div>
      {/* Chart Content */}
      <div className="w-full">{renderContent()}</div>
    </div>
  );
};

export default Chart;

import React, { useState, useEffect } from "react";
import { fetchChartData } from "../api/api";
import InputBox from "./InputBox";
import ChartContent from "./ChartContent";
import Loader from "./Loader";

const Chart = () => {
  const [selectedDimension, setSelectedDimension] = useState("");
  const [selectedMeasure, setSelectedMeasure] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedDimension, selectedMeasure]);

  const fetchData = async () => {
    setError(null);

    if (selectedDimension && selectedMeasure) {
      setLoading(true);
      try {
        const data = await fetchChartData([selectedMeasure], selectedDimension);
        if (data) {
          const actualValue = data.data[0].values.map((value, index) => ({
            [selectedDimension]: value,
            [selectedMeasure]: data.data[1].values[index],
          }));
          setChartData(actualValue);
        }
      } catch (error) {
        setError(`Error fetching chart data: ${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    } else if (chartData.length) {
      return (
        <ChartContent
          chartData={chartData}
          selectedDimension={selectedDimension}
          selectedMeasure={selectedMeasure}
        />
      );
    } else {
      return (
        <h1 className="text-center text-gray-500 text-3xl">
          {error == null
            ? "Please drag and drop the dimension and measurement."
            : error}
        </h1>
      );
    }
  };

  return (
    <div className="flex-[0.9] h-full flex flex-col justify-between items-center gap-28 mt-10">
      <div className="w-full flex flex-col items-center gap-5">
        {/* Dimension InputBox */}
        <InputBox
          label="Dimension"
          placeholder="Drag and Drop a Dimension"
          onDropFunction={setSelectedDimension}
        />
        {/* Measure InputBox */}
        <InputBox
          label="Measure"
          placeholder="Drag and Drop a Measure"
          onDropFunction={setSelectedMeasure}
        />
      </div>
      {/* Chart Content */}
      <div className="w-full">{renderContent()}</div>
    </div>
  );
};

export default Chart;

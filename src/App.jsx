import { useState, useEffect } from "react";
import { fetchColumns, fetchChartData } from "./api";
import ColumnsSidebar from "./components/ColumnsSidebar";
import InputBox from "./components/InputBox";

const App = () => {
  const [columns, setColumns] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState("");
  const [selectedMeasure, setSelectedMeasure] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchColumns()
      .then((columnsData) => {
        setColumns(columnsData);
      })
      .catch((error) => {
        console.error("Error fetching columns:", error);
      });
  }, []);

  const handleFetchChartData = () => {
    // Fetch chart data based on selected dimension and measure
    if (selectedDimension && selectedMeasure) {
      fetchChartData(selectedDimension, selectedMeasure)
        .then((chartData) => {
          setChartData(chartData);
        })
        .catch((error) => {
          console.error("Error fetching chart data:", error);
        });
    }
  };

  // Sample handleDimensionDrop function
  const handleDimensionDrop = (columnName) => {
    console.log(`Dimension column dropped: ${columnName}`);
    // API calls
  };

  // Sample handleMeasureDrop function
  const handleMeasureDrop = (columnName) => {
    console.log(`Measure column dropped: ${columnName}`);
    // API calls
  };

  return (
    <div className="w-screen flex">
      {/* Sidebar */}
      <ColumnsSidebar columns={columns} />

      <div className="flex-[0.9] w-full h-full flex flex-col justify-center items-center">
        {/* Inputs for dimensions and measures */}
        <div className="w-full flex flex-col items-center gap-5">
          <InputBox
            label="Dimension"
            placeholder="Drag and Drop a Dimension"
            onDropFunction={handleDimensionDrop}
          />
          <InputBox
            label="Measure"
            placeholder="Drag and Drop a Measure"
            onDropFunction={handleMeasureDrop}
          />
        </div>

        {/* Chart */}
        <div>
          <h2>Chart</h2>
          {/* Render chartData */}
        </div>
      </div>
    </div>
  );
};

export default App;

import { useEffect, useReducer, useState } from "react";
import { fetchChartData } from "../api/api";
import DimensionInputBox from "./DimensionInputBox";
import MeasureInputBox from "./MeasureInputBox";
import ChartSection from "./ChartSection";

// Initial state for the reducer
const initialState = {
  selectedDimension: "",
  selectedMeasure: "",
  chartData: [],
  dimensionErrorMessage: "",
  measureErrorMessage: "",
  loading: false,
  error: null,
};

// Reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DIMENSION":
      return { ...state, selectedDimension: action.payload };
    case "SET_MEASURE":
      return { ...state, selectedMeasure: action.payload };
    case "SET_CHART_DATA":
      return { ...state, chartData: action.payload };
    case "SET_DIMENSION_ERROR":
      return { ...state, dimensionErrorMessage: action.payload };
    case "SET_MEASURE_ERROR":
      return { ...state, measureErrorMessage: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_INPUT_FIELDS":
      return { ...initialState };
    default:
      return state;
  }
};

// Main Chart component
const Chart = ({ columns }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    selectedDimension,
    selectedMeasure,
    chartData,
    dimensionErrorMessage,
    measureErrorMessage,
    loading,
    error,
  } = state;

  const [isInputChanged, setIsInputChanged] = useState(false);

  // Fetch data when dimension, measure, or input change
  useEffect(() => {
    fetchData();
  }, [selectedDimension, selectedMeasure, isInputChanged]);

  // Fetch chart data asynchronously
  const fetchData = async () => {
    // Reset error messages and loading state
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_DIMENSION_ERROR", payload: "" });
    dispatch({ type: "SET_MEASURE_ERROR", payload: "" });

    // If either dimension or measure is not selected, return
    if (!selectedDimension || !selectedMeasure) return;

    // Find selected dimension and measure columns
    const selectedDimensionColumn = columns.find(
      (column) => column.name === selectedDimension
    );
    const selectedMeasureColumn = columns.find(
      (column) => column.name === selectedMeasure
    );

    // Validate dimension and measure columns
    if (selectedDimensionColumn?.function !== "dimension") {
      dispatch({
        type: "SET_DIMENSION_ERROR",
        payload: "The input is not a valid dimension",
      });
      return;
    }

    if (selectedMeasureColumn?.function !== "measure") {
      dispatch({
        type: "SET_MEASURE_ERROR",
        payload: "The input is not a valid measure",
      });
      return;
    }

    // Set loading state before fetching data
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      // Fetch chart data from API
      const data = await fetchChartData([selectedMeasure], selectedDimension);
      if (data) {
        // Format fetched data
        const actualValues = data.data[0].values.map((value, index) => ({
          [selectedDimension]: value,
          [selectedMeasure]: data.data[1].values[index],
        }));
        // Update chart data in the state
        dispatch({ type: "SET_CHART_DATA", payload: actualValues });
      }
    } catch (error) {
      // Handle error during data fetching
      dispatch({
        type: "SET_ERROR",
        payload: `Error fetching chart data: ${error}`,
      });
    } finally {
      // Reset loading state after data fetching completes
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Clear input fields based on the provided identifier
  const clearInputFields = (identifier) => {
    if (identifier === "dimension") {
      dispatch({ type: "SET_DIMENSION", payload: "" });
    } else if (identifier === "measure") {
      dispatch({ type: "SET_MEASURE", payload: "" });
    }
    // Clear chart data
    dispatch({ type: "SET_CHART_DATA", payload: [] });
  };

  // Handle input change
  const handleInputChange = () => {
    setIsInputChanged(true);
  };

  // Render Chart component
  return (
    <div className="w-full md:w-9/12 h-full lg:w-8/12 mx-auto mt-10 flex flex-col justify-center items-center md:gap-20 gap-10">
      <div className="w-full flex flex-col items-center gap-5">
        {/* Dimension InputBox */}
        <DimensionInputBox
          selectedDimension={selectedDimension}
          dimensionErrorMessage={dimensionErrorMessage}
          onDimensionChange={(value) =>
            dispatch({ type: "SET_DIMENSION", payload: value })
          }
          clearDimensionInput={() => clearInputFields("dimension")}
          onInputChange={handleInputChange}
        />

        {/* Measure InputBox */}
        <MeasureInputBox
          selectedMeasure={selectedMeasure}
          measureErrorMessage={measureErrorMessage}
          onMeasureChange={(value) =>
            dispatch({ type: "SET_MEASURE", payload: value })
          }
          clearMeasureInput={() => clearInputFields("measure")}
          onInputChange={handleInputChange}
        />
      </div>
      {/* Chart Section */}
      <ChartSection
        loading={loading}
        chartData={chartData}
        error={error || dimensionErrorMessage || measureErrorMessage}
        selectedDimension={selectedDimension}
        selectedMeasure={selectedMeasure}
      />
    </div>
  );
};

export default Chart;

import { useEffect, useReducer } from "react";
import { fetchChartData } from "../api/api";
import InputBox from "./InputBox";
import ChartContent from "./ChartContent";
import Loader from "./Loader";

const initialState = {
  selectedDimension: "",
  selectedMeasure: "",
  chartData: [],
  dimensionErrorMessage: "",
  measureErrorMessage: "",
  loading: false,
  error: null,
};

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

  useEffect(() => {
    fetchData();
  }, [selectedDimension, selectedMeasure]);

  const fetchData = async () => {
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_DIMENSION_ERROR", payload: "" });
    dispatch({ type: "SET_MEASURE_ERROR", payload: "" });

    if (!selectedDimension || !selectedMeasure) return;

    const selectedDimensionColumn = columns.find(
      (column) => column.name === selectedDimension
    );
    const selectedMeasureColumn = columns.find(
      (column) => column.name === selectedMeasure
    );

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

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await fetchChartData([selectedMeasure], selectedDimension);
      if (data) {
        const actualValues = data.data[0].values.map((value, index) => ({
          [selectedDimension]: value,
          [selectedMeasure]: data.data[1].values[index],
        }));
        dispatch({ type: "SET_CHART_DATA", payload: actualValues });
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: `Error fetching chart data: ${error}`,
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const clearInputFields = (identifier) => {
    if (identifier === "dimension") {
      dispatch({ type: "SET_DIMENSION", payload: "" });
    } else if (identifier === "measure") {
      dispatch({ type: "SET_MEASURE", payload: "" });
    }
    dispatch({ type: "SET_CHART_DATA", payload: [] });
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
          onDropFunction={(value) =>
            dispatch({ type: "SET_DIMENSION", payload: value })
          }
          value={selectedDimension}
          notValidInputMessage={dimensionErrorMessage}
          clearInput={() => clearInputFields("dimension")}
        />
        {/* Measure InputBox */}
        <InputBox
          label="Measure"
          placeholder="Drag and Drop a Measure"
          onDropFunction={(value) =>
            dispatch({ type: "SET_MEASURE", payload: value })
          }
          value={selectedMeasure}
          notValidInputMessage={measureErrorMessage}
          clearInput={() => clearInputFields("measure")}
        />
      </div>
      {/* Chart Content */}
      <div className="w-full">{renderContent()}</div>
    </div>
  );
};

export default Chart;

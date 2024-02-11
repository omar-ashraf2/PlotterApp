import ChartContent from "./ChartContent";
import Loader from "./Loader";

const ChartSection = ({
  loading,
  chartData,
  error,
  selectedDimension,
  selectedMeasure,
}) => {
  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <h1 className="text-center text-gray-500 text-3xl">{error}</h1>;
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
      <h1 className="text-center text-gray-500 md:text-3xl text-lg">
        Please drag and drop a valid dimension and measurement.
      </h1>
    );
  };

  return <div className="w-full">{renderContent()}</div>;
};

export default ChartSection;

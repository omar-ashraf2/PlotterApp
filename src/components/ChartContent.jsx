import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const ChartContent = ({ chartData, selectedDimension, selectedMeasure }) => {
  // Extract dimension values and measure ranges
  const dimensionValues = chartData.map((data) => data[selectedDimension]);
  const measureValues = chartData.map((data) => data[selectedMeasure]);

  // Calculate measure range
  const minMeasure = Math.min(...measureValues);
  const maxMeasure = Math.max(...measureValues);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 40, left: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          dataKey={selectedDimension}
          type="category"
          allowDataOverflow={true}
          tickCount={dimensionValues.length}
        />
        <YAxis
          domain={[minMeasure, maxMeasure]}
          allowDataOverflow={true}
          tickCount={measureValues.length}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey={selectedMeasure}
          stroke="#8884d8"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartContent;

import { useState, useEffect } from "react";
import { fetchColumns } from "./api/api";
import ColumnsSidebar from "./components/ColumnsSidebar";
import Chart from "./components/ChartComponent/Chart";

const App = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchColumns()
      .then((columnsData) => {
        setColumns(columnsData);
      })
      .catch((error) => {
        console.error("Error fetching columns:", error);
      });
  }, []);

  return (
    <div className="w-screen flex">
      {/* Sidebar */}
      <ColumnsSidebar columns={columns} />
      {/* Chart and Inputs */}
      <Chart columns={columns} />
    </div>
  );
};

export default App;

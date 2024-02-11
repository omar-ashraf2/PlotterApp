const ColumnsSidebar = ({ columns }) => {
  const handleDragStart = (event, columnName) => {
    event.dataTransfer.setData("text/plain", columnName);
  };
  return (
    <div className="md:w-max min-h-screen border-r">
      <h2 className="font-bold text-3xl border-b p-4 md:p-8">Columns</h2>
      <div className="p-4 md:p-8">
        {columns.map((column) => (
          <div
            key={column.name}
            className={`mb-3 md:mb-5 text-base md:text-lg font-medium ${
              column.function === "dimension"
                ? "text-green-600"
                : "text-blue-600"
            }`}
            draggable="true"
            onDragStartCapture={(event) => handleDragStart(event, column.name)}
          >
            {column.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnsSidebar;

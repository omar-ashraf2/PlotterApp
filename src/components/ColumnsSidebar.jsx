const ColumnsSidebar = ({ columns }) => {
  const handleDragStart = (event, columnName) => {
    event.dataTransfer.setData("text/plain", columnName);
  };
  return (
    <div className="flex-[0.1] min-h-screen border-r bg-">
      <h2 className="font-bold text-3xl border-b p-8">Columns</h2>
      <div className="p-8">
        {columns.map((column) => (
          <div
            key={column.name}
            className="mb-5 text-lg font-medium"
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

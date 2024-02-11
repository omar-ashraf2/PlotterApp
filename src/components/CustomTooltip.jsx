const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        {payload[0].dataKey && (
          <p key="product1" className="text-sm text-blue-400">
            {payload[0].dataKey}: <span>{payload[0].value}</span>
          </p>
        )}
      </div>
    );
  }
};

export default CustomTooltip;

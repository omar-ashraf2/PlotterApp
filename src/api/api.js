const API_BASE_URL = "https://plotter-task-8019e13a60ac.herokuapp.com";

// Fetch column data from the API
export const fetchColumns = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/columns`);
    if (!response.ok) {
      throw new Error("Failed to fetch columns");
    }
    const data = await response.json();
    return data.columns;
  } catch (error) {
    console.error("Error fetching columns:", error);
    throw error;
  }
};

// Fetch chart data based on dimensions and measures from the API
export const fetchChartData = async (measures, dimension) => {
  try {
    const response = await fetch(`${API_BASE_URL}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        measures,
        dimension,
      }),
    });

    if (!response.ok) {
      throw new Error("API response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

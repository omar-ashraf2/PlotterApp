const API_BASE_URL = "https://plotter-task-8019e13a60ac.herokuapp.com";

// Fetch column data from the API
export const fetchColumns = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/columns`);
    if (!response.ok) {
      throw new Error("Failed to fetch columns");
    }
    const data = await response.json();
    console.log(data);
    return data.columns;
  } catch (error) {
    console.error("Error fetching columns:", error);
    throw error;
  }
};

// Fetch chart data based on dimensions and measures from the API
export const fetchChartData = async (dimensions, measures) => {
  try {
    const requestData = {
      dimensions,
      measures,
    };

    const response = await fetch(`${API_BASE_URL}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chart data");
    }
    const responseData = await response.json();
    console.log(responseData.data);
    return responseData.data;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
};

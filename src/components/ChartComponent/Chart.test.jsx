import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Chart from "./Chart";
import { vi } from "vitest";
import { fetchChartData } from "../../api/api";


// Mock fetchChartData function
vi.mock("../../api/api", () => ({
  fetchChartData: vi.fn(),
}));

describe("Chart", () => {
  it("fetches chart data when dimension and measure are selected", async () => {
    // Mock columns data
    const columns = [
      { name: "Dimension", function: "dimension" },
      { name: "Measure", function: "measure" },
    ];

    // Mock fetchChartData response
    const mockChartData = {
      data: [{ values: ["Value 1", "Value 2"] }, { values: [10, 20] }],
    };
    fetchChartData.mockResolvedValue(mockChartData);

    render(<Chart columns={columns} />);

    // Select dimension
    fireEvent.change(screen.getByLabelText("Dimension:"), {
      target: { value: "Dimension" },
    });
    // Select measure
    fireEvent.change(screen.getByLabelText("Measure:"), {
      target: { value: "Measure" },
    });

    // Wait for data fetching to complete
    await screen.findByText("Value 1");
    screen.debug();
    expect(screen.getByText("Value 1")).toBeInTheDocument();
    expect(screen.getByText("Value 2")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});

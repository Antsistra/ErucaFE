import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const useChart = (data, options) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data,
      options,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, options]);

  return canvasRef;
};

export default useChart;

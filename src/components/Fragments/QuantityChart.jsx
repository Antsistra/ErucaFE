import useChart from "@/hooks/useChart";
import React from "react";

const QuantityChart = ({
  quantityData,
  chartType,
  setChartType,
}) => {
  const data = {
    labels: quantityData.map((item) =>
      chartType === "monthly"
        ? new Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long",
          }).format(new Date(item.month))
        : new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(item.day))
    ),
    datasets: [
      {
        label: "Jumlah Barang Terjual",
        data: quantityData.map(
          (item) => item.totalQuantity
        ),
        fill: true,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(153, 102, 255, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        bodySpacing: 4,
        cornerRadius: 4,
        displayColors: false,
        xPadding: 10,
        yPadding: 10,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} pcs`;
          },
        },
      },
    },
  };

  const canvasRef = useChart(data, options);

  return (
    <div className="mt-14">
      <div className="flex justify-between mb-4">
        <h1>Grafik Jumlah Barang Terjual</h1>
      </div>
      <div style={{ height: "300px", width: "100%" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default QuantityChart;

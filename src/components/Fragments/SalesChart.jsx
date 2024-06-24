import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
ThemeContext;
const SalesChart = ({
  salesData,
  chartType,
  setChartType,
}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const data = {
    labels: salesData.map((item) =>
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
        label: "Penjualan",
        data: salesData.map((item) => item.totalSales),
        fill: true,
        backgroundColor:
          theme === "dark"
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(75, 192, 192, 0.2)",
        borderColor:
          theme === "dark"
            ? "#D7AF70"
            : "rgba(75, 192, 192, 1)",
        pointBackgroundColor:
          theme === "dark"
            ? "rgba(255, 255, 255, 1)"
            : "rgba(75, 192, 192, 1)",
        pointBorderColor: "#EA9010",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor:
          theme === "dark"
            ? "#EA9010"
            : "rgba(75, 192, 192, 1)",
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
        ticks: {
          color: theme === "dark" ? "#fff" : "#000", // Teks tanggal menjadi putih saat mode gelap
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: theme === "dark" ? "#fff" : "#000", // Teks vertikal menjadi putih saat mode gelap
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
          color: theme === "dark" ? "#fff" : "#000",
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
            return `Rp ${new Intl.NumberFormat(
              "id-ID"
            ).format(tooltipItem.raw)}`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-14 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between mb-4">
        <h1>Grafik Penjualan</h1>
      </div>
      <div style={{ height: "300px", width: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesChart;

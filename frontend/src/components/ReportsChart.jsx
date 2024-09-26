import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ReportsChart = ({ reports }) => {
  const data = {
    labels: [`${reports.month}/${reports.year}`], // Label: miesiąc/rok
    datasets: [
      {
        label: "Expenses",
        data: [reports.expenses], // Dane wydatków
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Incomes",
        data: [reports.incomes], // Dane dochodów
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Financial Summary",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ReportsChart;

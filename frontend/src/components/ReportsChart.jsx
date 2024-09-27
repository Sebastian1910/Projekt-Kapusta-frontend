import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Rejestracja elementów Chart.js potrzebnych do wykresu słupkowego
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ReportsChart = ({ reports }) => {
  // Obsługa przypadku, gdy reports nie jest tablicą
  const validReports = Array.isArray(reports) ? reports : [reports];

  const data = {
    labels: validReports.map((report) => `${report.month}/${report.year}`), // Etykiety na osi x
    datasets: [
      {
        label: "Expenses",
        data: validReports.map((report) => report.expenses), // Wydatki
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Kolor słupków wydatków
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
      {
        label: "Incomes",
        data: validReports.map((report) => report.incomes), // Dochody
        backgroundColor: "#FF751D", // Kolor słupków dochodów
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Pozycja legendy
      },
      title: {
        display: true,
        text: "Monthly Financial Summary", // Tytuł wykresu
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Skala Y zaczyna się od 0
      },
    },
  };

  return <Bar data={data} options={options} />; // Zmieniono komponent na Bar
};

export default ReportsChart;

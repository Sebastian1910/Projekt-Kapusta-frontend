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
import "../styles/components/ReportsChart.scss";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ReportsChart = ({ transactions = [], selectedCategory }) => {
  // Filtrowanie transakcji według wybranej kategorii
  const categoryTransactions = transactions
    .filter((t) => t.category.toLowerCase() === selectedCategory.toLowerCase())
    // Sortowanie transakcji od największej do najmniejszej
    .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

  if (categoryTransactions.length === 0) {
    return <p className="chart-text">No data available for the selected category.</p>;
  }

  const data = {
    labels: categoryTransactions.map((t) => t.description), // Opisy transakcji
    datasets: [
      {
        label: "Amount",
        data: categoryTransactions.map((t) => Math.abs(t.amount)), // Ustawiamy wartości jako dodatnie
        backgroundColor: ["#FF751D", "#FED9BF", "#FED9BF"],
        barThickness: 15, 
        borderRadius: 50,
        
      },
    ],
  };

  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Ukryjemy legendę
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false, // Ukryjemy skalę Y
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ReportsChart;

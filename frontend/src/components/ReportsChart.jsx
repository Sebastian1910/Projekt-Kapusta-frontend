import React from "react";
import { useMediaQuery } from "react-responsive";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../styles/components/ReportsChart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels, // Rejestracja pluginu
);

const ReportsChart = ({ transactions = [], selectedCategory }) => {
  // Filtrowanie transakcji według wybranej kategorii
  const categoryTransactions = transactions
    .filter((t) => t.category.toLowerCase() === selectedCategory.toLowerCase())
    // Sortowanie transakcji od największej do najmniejszej
    .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

  if (categoryTransactions.length === 0) {
    return (
      <p className="chart-text">No data available for the selected category.</p>
    );
  }
  const mobile = useMediaQuery({ query: "(max-width: 768px)" });

  const data = {
    labels: categoryTransactions.map((t) => t.description), // Opisy transakcji
    datasets: [
      {
        label: "Amount",
        data: categoryTransactions.map((t) => Math.abs(t.amount)), // Ustawiamy wartości jako dodatnie
        backgroundColor: ["#FF751D", "#FED9BF", "#FED9BF"],
        
      },
    ],
  };

  const options = {
    indexAxis: mobile ? 'y' : 'x',
    barThickness: mobile ? 15 : 38,
    borderRadius: mobile ? 50 : 10,
    responsive: true,
    plugins: {
      legend: {
        display: false, // Ukryjemy legendę
      },
      datalabels: {
        display: true,
        color: "#52555F", // Kolor etykiet
        anchor: "end",
        align: "top",
        formatter: (value) => value + " UAH", // Dodanie waluty do etykiet
        font: {
          size: mobile ? 10 : 12,
        },
        padding: {
          top: 10, // Dodajemy padding od góry, aby przesunąć etykiety
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Usuwamy pionowe linie siatki
          drawBorder: false,
        },
        ticks: {
          display: mobile ? false : true,
          padding: 25,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: mobile ? false : true,
          padding: 36,
          color: "#e0e0e0", // Kolor poziomych linii
          drawBorder: false,
        },
        ticks: {
          display: mobile ? true : false,
        },
      },
    },

    layout: {
      padding: {
        top: 50, // Dodajemy padding od góry dla całego wykresu
        right: 20, // Dodajemy padding z prawej strony
        bottom: 20, // Dodajemy padding od dołu
        left: 20, // Dodajemy padding z lewej strony
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default ReportsChart;

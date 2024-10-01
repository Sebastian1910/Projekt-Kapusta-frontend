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
      datalabels: {
        display: true,
        color: "#52555F", // Kolor etykiet
        anchor: "end",
        align: "top",
        formatter: (value) => value + " UAH", // Dodanie waluty do etykiet
        font: {
          size: 10,
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
        },
        ticks: {
          padding: 25, // Ustawiamy przerwę między słupkami na 25px
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true, // Wyświetlamy tylko poziome linie siatki
          drawBorder: false, // Ukrywamy linię krawędzi po lewej stronie
          color: "#e0e0e0", // Kolor poziomych linii
        },
        ticks: {
          display: false, // Ukrywamy etykiety skali Y
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

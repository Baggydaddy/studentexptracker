import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [1200, 1500, 1100, 1700, 1600, 1800],
        backgroundColor: "#3b82f6",
      },
      {
        label: "Expenses",
        data: [800, 900, 700, 1000, 950, 1100],
        backgroundColor: "#ef4444",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px", padding: "1rem" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Food", "Transport", "Rent", "Entertainment", "Savings"],
    datasets: [
      {
        label: "Expenses",
        data: [300, 150, 500, 100, 250],
        backgroundColor: [
          "#3b82f6",
          "#06b6d4",
          "#6366f1",
          "#ec4899",
          "#22c55e",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px", padding: "1rem" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;

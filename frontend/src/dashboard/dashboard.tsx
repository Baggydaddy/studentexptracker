import React from "react";
import UserOverview from "./UserOverview";
import "./dashboard.css";
import PieChart from "../Chart/pieChart";
import BarChart from "../Chart/Barchart";
import RecentTransactions from "../Activity/recent";

interface Props {
  address: string;
  balance: string;
}

const Dashboard: React.FC<Props> = ({ address, balance }) => {
  return (
    <div className="dashboard-container">
      <UserOverview
        address={address}
        balance={balance}
        totalExpenses={450}
        monthlyBudget={1000}
      />
      <div className="charts-container">
        <div className="barchart-section">
          <BarChart />
        </div>
        <div className="barchart-section">
          <PieChart />
        </div>
      </div>
      <div className="transactions-card">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;

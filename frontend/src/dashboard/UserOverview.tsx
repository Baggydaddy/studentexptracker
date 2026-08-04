import React from "react";
import { Wallet, Activity, PieChart, CreditCard } from "lucide-react";
import "./dashboard.css";

interface Props {
  address: string;
  balance: string;
  totalExpenses: number;
  monthlyBudget: number;
}

const UserOverview: React.FC<Props> = ({
  address,
  balance,
  totalExpenses,
  monthlyBudget,
}) => {
  const remainingBudget = monthlyBudget - totalExpenses;
  const budgetPercent = Math.min(
    (totalExpenses / monthlyBudget) * 100,
    100
  ).toFixed(0);

  return (
    <div className="overview-grid">
      {/* Wallet Address */}
      <div className="overview-card">
        <div className="card-header">
          <Wallet className="card-icon icon-blue" />
          <h3 className="card-title">Wallet Address</h3>
        </div>
        <p className="wallet-address">{address || "Not Connected"}</p>
      </div>

      {/* Wallet Balance */}
      <div className="overview-card">
        <div className="card-header">
          <CreditCard className="card-icon icon-green" />
          <h3 className="card-title">Wallet Balance</h3>
        </div>
        <p className="card-value">{balance} ETH</p>
      </div>

      {/* Total Expenses */}
      <div className="overview-card">
        <div className="card-header">
          <Activity className="card-icon icon-red" />
          <h3 className="card-title">Total Expenses</h3>
        </div>
        <p className="card-value">${totalExpenses.toFixed(2)}</p>
      </div>

      {/* Budget */}
      <div className="overview-card">
        <div className="card-header">
          <PieChart className="card-icon icon-purple" />
          <h3 className="card-title">Monthly Budget</h3>
        </div>

        <p className="budget-value">${monthlyBudget.toFixed(2)}</p>

        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${budgetPercent}%` }}></div>
        </div>

        <p className="budget-status">
          {remainingBudget >= 0
            ? `${budgetPercent}% used`
            : `Over budget by $${Math.abs(remainingBudget).toFixed(2)}`}
        </p>
      </div>
    </div>
  );
};

export default UserOverview;

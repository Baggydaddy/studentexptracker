import React, { useState, useMemo } from "react";
import "./Analytics.css";
import AnalyticsBarChart from "../Chart/Barchart";
import AnalyticsPieChart from "../Chart/pieChart";
import { Calendar } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  status: "Completed" | "Pending" | "Failed";
}

interface BudgetData {
  category: string;
  budget: number;
  actual: number;
}

const Analytics: React.FC = () => {
  const [startDate, setStartDate] = useState("2023-12-01");
  const [endDate, setEndDate] = useState("2023-12-31");

  const transactions: Transaction[] = [
    {
      id: "1",
      title: "Apple Store",
      category: "Technology",
      date: "2023-12-28",
      amount: 999.0,
      type: "expense",
      status: "Completed",
    },
    {
      id: "2",
      title: "Monthly Salary",
      category: "Income",
      date: "2023-12-27",
      amount: 5000.0,
      type: "income",
      status: "Completed",
    },
    {
      id: "3",
      title: "Starbucks Coffee",
      category: "Food & Drink",
      date: "2023-12-26",
      amount: 15.5,
      type: "expense",
      status: "Completed",
    },
    {
      id: "4",
      title: "House Rent",
      category: "Housing",
      date: "2023-12-25",
      amount: 1200.0,
      type: "expense",
      status: "Pending",
    },
    {
      id: "5",
      title: "Freelance Project",
      category: "Income",
      date: "2023-12-24",
      amount: 800.0,
      type: "income",
      status: "Completed",
    },
    {
      id: "6",
      title: "Netflix Subscription",
      category: "Entertainment",
      date: "2023-12-23",
      amount: 12.99,
      type: "expense",
      status: "Completed",
    },
    {
      id: "7",
      title: "Gas Station",
      category: "Transportation",
      date: "2023-12-22",
      amount: 45.0,
      type: "expense",
      status: "Failed",
    },
  ];

  const budgetData: BudgetData[] = [
    { category: "Housing", budget: 1500, actual: 1200 },
    { category: "Food & Drink", budget: 300, actual: 15.5 },
    { category: "Transportation", budget: 200, actual: 45 },
    { category: "Entertainment", budget: 100, actual: 12.99 },
    { category: "Technology", budget: 500, actual: 999 },
  ];

  // Filter transactions by date range
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return txDate >= start && txDate <= end;
    });
  }, [startDate, endDate]);

  // Calculate income vs expense totals
  const incomeExpenseData = useMemo(() => {
    const income = filteredTransactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const expense = filteredTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);
    return [
      { name: "Income", value: income, fill: "#10b981" },
      { name: "Expense", value: expense, fill: "#ef4444" },
    ];
  }, [filteredTransactions]);

  // Calculate budget data for selected date range
  const budgetAnalysis = useMemo(() => {
    const categorySpending: { [key: string]: number } = {};
    filteredTransactions
      .filter((tx) => tx.type === "expense")
      .forEach((tx) => {
        categorySpending[tx.category] =
          (categorySpending[tx.category] || 0) + tx.amount;
      });

    return budgetData.map((item) => ({
      ...item,
      actual: categorySpending[item.category] || 0,
      variance: item.budget - (categorySpending[item.category] || 0),
    }));
  }, [filteredTransactions]);

  const totalIncome = incomeExpenseData[0].value;
  const totalExpense = incomeExpenseData[1].value;
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics & Insights</h1>

      {/* Date Range Filter */}
      <div className="date-filter-section">
        <div className="date-input-group">
          <Calendar size={20} />
          <label>From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="date-input-group">
          <Calendar size={20} />
          <label>To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card income">
          <div className="card-label">Total Income</div>
          <div className="card-amount">₦{totalIncome.toLocaleString()}</div>
        </div>
        <div className="summary-card expense">
          <div className="card-label">Total Expense</div>
          <div className="card-amount">₦{totalExpense.toLocaleString()}</div>
        </div>
        <div
          className={`summary-card balance ${
            netBalance >= 0 ? "positive" : "negative"
          }`}>
          <div className="card-label">Net Balance</div>
          <div className="card-amount">₦{netBalance.toLocaleString()}</div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Income vs Expense Analysis */}
        <div className="chart-card">
          <h2 className="chart-title">Income vs Expense</h2>
          <div style={{ width: "100%", height: 300 }}>
            <AnalyticsPieChart />
          </div>
        </div>

        {/* Spending Trends Over Time */}
        <div className="chart-card">
          <h2 className="chart-title">Spending Trends</h2>
          <div style={{ width: "100%", height: 300 }}>
            <AnalyticsBarChart />
          </div>
        </div>
      </div>

      {/* Budget vs Actual Spending */}
      <div className="budget-section">
        <h2 className="section-title">Budget vs Actual Spending</h2>
        <div className="budget-chart-container">
          <div style={{ width: "100%", height: 400 }}>
            <AnalyticsBarChart />
          </div>
        </div>

        {/* Budget Variance Table */}
        <div className="budget-table-container">
          <table className="budget-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Actual</th>
                <th>Variance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {budgetAnalysis.map((item) => (
                <tr key={item.category}>
                  <td className="category-name">{item.category}</td>
                  <td className="amount">₦{item.budget.toLocaleString()}</td>
                  <td className="amount">₦{item.actual.toLocaleString()}</td>
                  <td
                    className={`variance ${
                      item.variance >= 0 ? "under" : "over"
                    }`}>
                    ₦{Math.abs(item.variance).toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.variance >= 0 ? "under-budget" : "over-budget"
                      }`}>
                      {item.variance >= 0 ? "Under" : "Over"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

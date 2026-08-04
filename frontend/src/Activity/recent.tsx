import React from "react";
import "./recent.css";

interface Transaction {
  id: number;
  title: string;
  category: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending";
}

const transactions: Transaction[] = [
  {
    id: 1,
    title: "Groceries",
    category: "Food",
    date: "Today",
    amount: -2500,
    status: "Completed",
  },
  {
    id: 2,
    title: "Transport",
    category: "Travel",
    date: "Yesterday",
    amount: -1200,
    status: "Completed",
  },
  {
    id: 3,
    title: "Salary",
    category: "Income",
    date: "Dec 20",
    amount: 150000,
    status: "Completed",
  },
  {
    id: 4,
    title: "Electricity Bill",
    category: "Utilities",
    date: "Dec 18",
    amount: -18000,
    status: "Pending",
  },
];

const RecentTransactions: React.FC = () => {
  return (
    <div className="transactions-card">
      <div className="transactions-header">
        <h3>Recent Transactions</h3>
        <button className="view-all">View all</button>
      </div>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.title}</td>
              <td>{tx.category}</td>
              <td
                className={tx.amount < 0 ? "amount expense" : "amount income"}>
                {tx.amount < 0 ? "-" : "+"}₦
                {Math.abs(tx.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td>
                <span
                  className={`status ${
                    tx.status === "Completed" ? "completed" : "pending"
                  }`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;

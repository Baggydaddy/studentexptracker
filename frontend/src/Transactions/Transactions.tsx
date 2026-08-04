import React, { useState } from "react";
import "./Transactions.css";
import { Search, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  status: "Completed" | "Pending" | "Failed";
}

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all",
  );

  const [transactions] = useState<Transaction[]>([
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
  ]);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="transactions-container">
      <div className="transactions-controls">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-wrapper">
          <Filter className="filter-icon" size={20} />
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "income" | "expense")
            }>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="transactions-list-card">
        <table className="full-transactions-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>
                  <div className="tx-info">
                    <div className={`tx-icon-bg ${tx.type}`}>
                      {tx.type === "income" ? (
                        <ArrowDownLeft size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </div>
                    <span className="tx-title">{tx.title}</span>
                  </div>
                </td>
                <td>
                  <span className="tx-category">{tx.category}</span>
                </td>
                <td>
                  <span className="tx-date">{tx.date}</span>
                </td>
                <td>
                  <span className={`tx-amount ${tx.type}`}>
                    {tx.type === "expense" ? "-" : "+"}₦
                    {tx.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>
                <td>
                  <span className={`tx-status ${tx.status.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <div className="no-results">
            No transactions found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;

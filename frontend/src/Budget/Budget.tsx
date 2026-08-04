import React, { useState } from "react";
import "./Budget.css";
import { Plus, Trash2, Edit2 } from "lucide-react";

interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  spent: number;
  color: string;
}

const Budget: React.FC = () => {
  const [budgets] = useState<BudgetCategory[]>([
    {
      id: "1",
      name: "Food & Dining",
      limit: 500,
      spent: 350,
      color: "#ef4444",
    },
    {
      id: "2",
      name: "Transportation",
      limit: 200,
      spent: 120,
      color: "#3b82f6",
    },
    {
      id: "3",
      name: "Entertainment",
      limit: 150,
      spent: 180,
      color: "#f59e0b",
    },
    { id: "4", name: "Shopping", limit: 300, spent: 50, color: "#10b981" },
  ]);

  const totalLimit = budgets.reduce((acc, curr) => acc + curr.limit, 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0);

  return (
    <div className="budget-container">
      <div className="budget-header">
        <button className="add-budget-btn">
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="budget-summary-grid">
        <div className="summary-card">
          <span className="summary-label">Total Budget</span>
          <span className="summary-value">${totalLimit.toLocaleString()}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Spent</span>
          <span className="summary-value">${totalSpent.toLocaleString()}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Remaining</span>
          <span className="summary-value">
            ${(totalLimit - totalSpent).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="budget-list">
        {budgets.map((budget) => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOverBudget = budget.spent > budget.limit;

          return (
            <div key={budget.id} className="budget-item">
              <div className="budget-item-header">
                <div className="budget-info">
                  <div
                    className="category-dot"
                    style={{ backgroundColor: budget.color }}
                  />
                  <h3 className="category-name">{budget.name}</h3>
                </div>
                <div className="budget-actions">
                  <button className="action-btn">
                    <Edit2 size={16} />
                  </button>
                  <button className="action-btn">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="budget-progress-info">
                <span>
                  ${budget.spent} of ${budget.limit}
                </span>
                <span className={isOverBudget ? "over-budget" : ""}>
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: budget.color,
                  }}
                />
              </div>

              {isOverBudget && (
                <p className="warning-text">You have exceeded this budget!</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;

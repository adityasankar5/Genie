import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '../styles/budgeting.scss';

const BudgetingTool = () => {
  const [expenses, setExpenses] = useState<{ category: string; amount: number }[]>([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
    setCategory('');
    setAmount('');
  };

  const COLORS = ['#4B0082', '#FFD700', '#FFFFFF', '#8A2BE2'];

  return (
    <div className="budgeting">
      <h2 className="budgeting__title">Budgeting Tool</h2>
      <div className="budgeting__form">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="budgeting__input"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="budgeting__input"
        />
        <button onClick={addExpense} className="budgeting__button">
          Add Expense
        </button>
      </div>
      <div className="budgeting__chart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={expenses} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="amount">
              {expenses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetingTool;
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
    <div className="p-[2vh] w-full max-w-[90vw] mx-auto">
      <h2 className="text-[4vw] font-bold mb-[2vh]">Budgeting Tool</h2>
      <div className="mb-[2vh]">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full p-[1vh] mb-[1vh] border rounded"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-[1vh] mb-[1vh] border rounded"
        />
        <button
          onClick={addExpense}
          className="w-full p-[1vh] text-white bg-primary rounded hover:bg-accent"
        >
          Add Expense
        </button>
      </div>
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
  );
};

export default BudgetingTool;
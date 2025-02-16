import { useState } from 'react';

const calculateEMI = (P: number, r: number, n: number) => {
  const monthlyRate = r / 12 / 100;
  return (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
};

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [duration, setDuration] = useState('');
  const [emi, setEMI] = useState<number | null>(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const n = parseFloat(duration);
    setEMI(calculateEMI(P, r, n));
  };

  return (
    <div className="p-[2vh] w-full max-w-[90vw] mx-auto">
      <h2 className="text-[4vw] font-bold mb-[2vh]">Loan Calculator</h2>
      <div className="space-y-[1vh]">
        <input
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Loan Amount"
          className="w-full p-[1vh] border rounded"
        />
        <input
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Annual Interest Rate (%)"
          className="w-full p-[1vh] border rounded"
        />
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Loan Duration (Months)"
          className="w-full p-[1vh] border rounded"
        />
        <button
          onClick={calculate}
          className="w-full p-[1vh] text-white bg-primary rounded hover:bg-accent"
        >
          Calculate EMI
        </button>
      </div>
      {emi && <div className="mt-[2vh]">Monthly EMI: ₹{emi.toFixed(2)}</div>}
    </div>
  );
};

export default LoanCalculator;
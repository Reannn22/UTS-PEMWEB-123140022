import { useState } from "react";
import { formatCurrency } from "../utils/helpers";

const PortfolioCalculator = ({ coins }) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [totalValue, setTotalValue] = useState(null);

  const handleCalculate = () => {
    const coin = coins.find((c) => c.id === selectedCoin);
    if (coin && amount) {
      setTotalValue(coin.current_price * Number(amount));
    }
  };

  const handleReset = () => {
    setSelectedCoin("");
    setAmount("");
    setTotalValue(null);
  };

  return (
    <div className="card portfolio-card mt-6">
      <h3 className="text-lg font-semibold mb-4">Portfolio Calculator</h3>

      <div className="form-grid">
        <div>
          <label htmlFor="coin" className="block mb-1">
            Select Coin
          </label>
          <select
            id="coin"
            className="search-input"
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            required
          >
            <option value="">Select a coin</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="search-input"
            min="0"
            step="0.000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button
          onClick={handleCalculate}
          className="refresh-button"
          disabled={!selectedCoin || !amount}
        >
          Calculate
        </button>

        <button
          onClick={handleReset}
          className="refresh-button"
          style={{ background: "#4b5563" }}
        >
          Reset
        </button>
      </div>

      {totalValue !== null && (
        <div className="mt-4 text-center">
          <p className="text-gray-600">Total Value</p>
          <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioCalculator;

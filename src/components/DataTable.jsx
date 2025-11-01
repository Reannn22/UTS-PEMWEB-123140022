import { formatCurrency, formatNumber, formatPercentage } from '../utils/helpers';

const DataTable = ({ coins, onViewDetail }) => {
  if (!coins?.length) {
    return <div className="card text-center p-6">No data available</div>;
  }

  return (
    <div className="card table-wrapper">
      <div className="table-responsive">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id} className="table-row">
                <td>{index + 1}</td>
                <td>
                  <div className="coin-name-cell">
                    <img 
                      src={coin.image} 
                      alt={coin.name} 
                      className="coin-logo"
                      loading="lazy"
                    />
                    <span>{coin.name}</span>
                    <span className="coin-symbol">
                      {coin.symbol.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td>{formatCurrency(coin.current_price)}</td>
                <td 
                  className={
                    coin.price_change_percentage_24h >= 0 
                      ? 'price-positive' 
                      : 'price-negative'
                  }
                >
                  {formatPercentage(coin.price_change_percentage_24h)}
                </td>
                <td>{formatNumber(coin.market_cap)}</td>
                <td>
                  <button
                    onClick={() => onViewDetail(coin.id)}
                    className="refresh-button"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

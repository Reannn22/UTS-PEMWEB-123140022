import { useState, useEffect } from 'react';
import { getCoinDetail } from '../../utils/api';
import { formatCurrency, formatNumber } from '../../utils/helpers';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import PriceChart from '../charts/PriceChart';

const DetailCard = ({ coinId, onBack }) => {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        setLoading(true);
        const data = await getCoinDetail(coinId);
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetail();
  }, [coinId]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!coin) return null;

  return (
    <div className="container">
      <button onClick={onBack} className="mb-4">&larr; Back to List</button>
      
      <div className="grid-container">
        <div className="card">
          <div className="flex-container mb-4">
            <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
            <div>
              <h2 className="text-2xl font-bold">{coin.name}</h2>
              <p className="text-gray-600">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Current Price</p>
              <p className="text-xl font-bold">{formatCurrency(coin.market_data.current_price.usd)}</p>
            </div>
            <div>
              <p className="text-gray-600">Market Cap</p>
              <p className="text-xl font-bold">{formatNumber(coin.market_data.market_cap.usd)}</p>
            </div>
            <div>
              <p className="text-gray-600">24h High</p>
              <p className="text-green-600">{formatCurrency(coin.market_data.high_24h.usd)}</p>
            </div>
            <div>
              <p className="text-gray-600">24h Low</p>
              <p className="text-red-600">{formatCurrency(coin.market_data.low_24h.usd)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Price Chart (7 Days)</h3>
          <PriceChart coinId={coinId} />
        </div>
      </div>
    </div>
  );
};

export default DetailCard;

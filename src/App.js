import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { getCoinsMarkets } from './utils/api';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import DetailCard from './components/DetailCard';
import PortfolioCalculator from './components/PortfolioCalculator';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('');

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCoinsMarkets();
      setCoins(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependencies since it only uses setState functions

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const handleSearch = (query) => {
    // ...existing search logic...
  };

  const handleViewDetail = (coinId) => {
    setSelectedCoin(coinId);
    setShowDetail(true);
  };

  const handleRefresh = () => {
    fetchCoins();
  };

  return (
    <div id="main-content">
      <Header onRefresh={handleRefresh} loading={loading} />
      
      {!showDetail ? (
        <div className="container">
          <SearchForm onSearch={handleSearch} />
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRefresh} />
          ) : (
            <>
              <DataTable 
                coins={coins} 
                onViewDetail={handleViewDetail}
              />
              <PortfolioCalculator coins={coins} />
            </>
          )}
        </div>
      ) : (
        <DetailCard 
          coinId={selectedCoin} 
          onBack={() => setShowDetail(false)} 
        />
      )}
    </div>
  );
}

export default App;

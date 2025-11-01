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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const fetchCoins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCoinsMarkets(filters);
      setCoins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const handleSearch = (filterData) => {
    setFilters(filterData);
    fetchCoins();
  };

  const handleRefresh = () => fetchCoins();

  const handleViewDetail = (coinId) => {
    setSelectedCoin(coinId);
    setShowDetail(true);
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
            <DataTable 
              coins={coins} 
              onViewDetail={handleViewDetail}
            />
          )}
          <PortfolioCalculator coins={coins} />
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

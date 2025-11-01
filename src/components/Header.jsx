import { useState, useEffect } from 'react';

const Header = ({ onRefresh, loading }) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (!loading) {
      setLastUpdated(new Date());
    }
  }, [loading]);

  return (
    <header id="header">
      <div className="container flex-container">
        <div>
          <h1>Crypto Tracker</h1>
          <p className="text-sm opacity-80">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="refresh-button"
        >
          {loading ? (
            <div className="spinner w-5 h-5 border-2 border-white border-t-transparent" />
          ) : (
            '🔄 Refresh'
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;

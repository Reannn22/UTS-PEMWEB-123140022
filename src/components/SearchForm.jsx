import { useState } from 'react';
import { SORT_OPTIONS, PER_PAGE_OPTIONS } from '../utils/constants';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    searchTerm: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'market_cap_desc',
    limit: '50'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { minPrice, maxPrice } = formData;
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      alert('Minimum price cannot be greater than maximum price');
      return;
    }

    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-6">
      <div className="form-grid">
        <div>
          <label htmlFor="searchTerm">Search Coin</label>
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            className="search-input"
            placeholder="Bitcoin, Ethereum..."
            value={formData.searchTerm}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="minPrice">Min Price ($)</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            className="search-input"
            min="0"
            step="0.01"
            value={formData.minPrice}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="maxPrice">Max Price ($)</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            className="search-input"
            min="0"
            step="0.01"
            value={formData.maxPrice}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="sortBy">Sort By</label>
          <select
            id="sortBy"
            name="sortBy"
            className="search-input"
            value={formData.sortBy}
            onChange={handleChange}
            required
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="limit">Show Results</label>
          <select
            id="limit"
            name="limit"
            className="search-input"
            value={formData.limit}
            onChange={handleChange}
            required
          >
            {PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option} coins
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="refresh-button full-width">
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default SearchForm;

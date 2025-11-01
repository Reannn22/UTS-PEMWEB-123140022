import { useState, useEffect } from 'react';
import { getCoinMarketChart } from '../utils/api';
import { formatCurrency, formatDate } from '../utils/helpers';
import Loading from './Loading';

let Chart;
try {
  const { Line } = require('react-chartjs-2');
  const {
    Chart: ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } = require('chart.js');

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  Chart = Line;
} catch (err) {
  console.error('Chart.js failed to load:', err);
}

const PriceChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!Chart) {
        setError('Chart component failed to load');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getCoinMarketChart(coinId, 7);
        
        const prices = data.prices.map(([timestamp, price]) => ({
          x: formatDate(timestamp),
          y: price
        }));

        setChartData({
          labels: prices.map(p => p.x),
          datasets: [
            {
              label: 'Price',
              data: prices.map(p => p.y),
              borderColor: '#667eea',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              fill: true,
              tension: 0.4
            }
          ]
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [coinId]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!chartData || !Chart) return null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `Price: ${formatCurrency(context.raw)}`
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatCurrency(value)
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Chart data={chartData} options={options} />
    </div>
  );
};

export default PriceChart;

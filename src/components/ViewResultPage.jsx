import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewResultPage.css';
import logo from './nous_infosystems_logo.jpg'; // Adjust the path as needed

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ViewResultPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Updated to use relative URL for proxy
        const response = await axios.get('https://survey-app-nous.onrender.com/api/dashboard/getresult');
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching results', err);
      }
    };

    fetchResults();
  }, []);

  if (results.length === 0) return <p className="loading-text">Loading results...</p>;

  // Function to calculate percentages
  const calculatePercentages = (options) => {
    const totalResponses = options.reduce((sum, option) => sum + option.count, 0);
    return options.map((option) => ({
      ...option,
      percentage: totalResponses > 0 ? ((option.count / totalResponses) * 100).toFixed(2) : 0,
    }));
  };

  const generateChartData = (options) => {
    const optionsWithPercentages = calculatePercentages(options);
    return {
      labels: optionsWithPercentages.map((option) => `${option.option} (${option.percentage}%)`),
      datasets: [
        {
          data: optionsWithPercentages.map((option) => option.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
        }
      ]
    };
  };

  return (
    <div className="view-result-container">
      <img src={logo} alt="Nous Infosystems Logo" className="logo" />
      <div className="results-card">
        <h2 className="results-title">Quiz Results</h2>
        {results.map((result, index) => (
          <div key={result.questionId} className="question-section">
            <h3 className="question-title">
              Question {index + 1}: {result.questionText}
            </h3>
            <div className="chart-container">
              <Pie
                data={generateChartData(result.options)}
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: '#333',
                        font: {
                          size: 12
                        }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: (tooltipItem) => {
                          // Access the option directly from result.options
                          const option = result.options[tooltipItem.dataIndex];
                          return `${option.option}`;
                        }
                      }
                    }
                  },
                  maintainAspectRatio: false
                }}
                width={200}
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewResultPage;

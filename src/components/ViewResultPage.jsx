

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewResultPage.css';
import logo from './nous_infosystems_logo.jpg'; // Adjust the path as needed

import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ViewResultPage = () => {
  const [results, setResults] = useState([]);
  const [chartType, setChartType] = useState('pie'); // Default chart type is Pie

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // const response = await axios.get('http://127.0.0.1:5000/api/dashboard/getresult');
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

  // Generate chart data for both Pie and Bar charts
  const generateChartData = (options, chartType) => {
    const optionsWithPercentages = calculatePercentages(options);
    
    const backgroundColors = optionsWithPercentages.map(() => 
      `#${Math.floor(Math.random()*16777215).toString(16)}`
    ); // Generate random color for each option
    
    const commonData = {
      labels: optionsWithPercentages.map((option) => `${option.option} (${option.percentage}%)`),
      datasets: [
        {
          data: optionsWithPercentages.map((option) => option.count),
          backgroundColor: chartType === 'pie' ? backgroundColors : backgroundColors,
          hoverBackgroundColor: backgroundColors
        }
      ]
    };

    if (chartType === 'bar') {
      commonData.datasets[0].backgroundColor = backgroundColors;
      commonData.datasets[0].borderColor = backgroundColors;
      commonData.datasets[0].borderWidth = 1;
      commonData.options = {
        indexAxis: 'x',
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const option = options[tooltipItem.dataIndex];
                return `${option.option}`;
              }
            }
          }
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false // Hide the x-axis labels (option names)
          },
          y: {
            beginAtZero: true
          }
        }
      };
    }

    return commonData;
  };

  return (
    <div className="view-result-container">
      <img src={logo} alt="Nous Infosystems Logo" className="logo" />
      <div className="results-card">
        <h2 className="results-title">Quiz Results</h2>
        <button onClick={() => setChartType(chartType === 'pie' ? 'bar' : 'pie')} className="toggle-button">
          Switch to {chartType === 'pie' ? 'Bar' : 'Pie'} Chart
        </button>
        {results.map((result, index) => (
          <div key={result.questionId} className="question-section">
            <h3 className="question-title">
              Question {index + 1}: {result.questionText}
            </h3>
            <div className="chart-container">
              {chartType === 'pie' ? (
                <Pie
                  data={generateChartData(result.options, 'pie')}
                  options={{
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: '#333',
                          font: {
                            size: 16
                          }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => {
                            const option = result.options[tooltipItem.dataIndex];
                            return `${option.option}`;
                          }
                        }
                      }
                    },
                    maintainAspectRatio: false
                  }}
                  width={300}
                  height={300}
                />
              ) : (
                <Bar
                  data={generateChartData(result.options, 'bar')}
                  options={generateChartData(result.options, 'bar').options}
                  width={300}
                  height={300}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewResultPage;

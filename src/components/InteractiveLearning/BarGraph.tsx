import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarGraphProps {
  data?: number[];
  labels?: string[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export function BarGraph({
  data = [12, 19, 3, 5, 2, 3],
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  title = 'Sample Bar Chart',
  xAxisLabel = 'Categories',
  yAxisLabel = 'Values'
}: BarGraphProps) {
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [chartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
        beginAtZero: true,
      },
    },
  });

  useEffect(() => {
    setChartData({
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [data, labels, title]);

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
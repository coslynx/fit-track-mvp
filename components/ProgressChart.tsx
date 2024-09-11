import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [],
  });
  const store = useStore();

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await fetch(`/api/progress/${goalId}`);
        const data = await response.json();
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Progress',
              data: data.datasets[0].data,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, [goalId]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progress Chart',
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProgressChart;
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartWidgetProps {
  chartType: 'salesOverTime' | 'userEngagement';
  data: {
    dashboardData: {
      charts: {
        [key: string]: {
          labels: string[];
          data: number[];
        };
      };
    };
  };
  className?: string;
}

type ChartStyle = 'style1' | 'style2' | 'style3';

const ChartWidget: React.FC<ChartWidgetProps> = ({ chartType, data, className }) => {
  const [chartStyle, setChartStyle] = useState<ChartStyle>('style1');

  const chartData = data.dashboardData.charts[chartType]?.labels.map((label, index) => ({
    label,
    value: data.dashboardData.charts[chartType].data[index],
  }));

  const getLineStyle = () => {
    switch (chartStyle) {
      case 'style1':
        return { stroke: '#4CAF50', strokeWidth: 3 };
      case 'style2':
        return { stroke: '#FF5722', strokeWidth: 3, strokeDasharray: '5 5' };
      case 'style3':
        return { stroke: '#2196F3', strokeWidth: 3, strokeDasharray: '3 4 5 2' };
      default:
        return { stroke: '#4CAF50', strokeWidth: 3 };
    }
  };

  const getBackgroundStyle = () => {
    switch (chartStyle) {
      case 'style1':
        return 'bg-gradient-to-r from-gray-700 via-gray-900 to-black';
      case 'style2':
        return 'bg-gradient-to-r from-red-900 via-gray-800 to-black';
      case 'style3':
        return 'bg-gradient-to-r from-blue-900 via-gray-800 to-black';
      default:
        return 'bg-gradient-to-r from-gray-700 via-gray-900 to-black';
    }
  };

  const getxaxislabel = () => {
    return chartType === 'salesOverTime'? 'Date':'Week';
  };

  return (
    <div className={`${getBackgroundStyle()} shadow-2xl rounded-xl p-8 ${className}`}>
      <h2 className="text-3xl font-bold text-white mb-6">
        {chartType === 'salesOverTime' ? 'Sales Over Time' : 'User Engagement'}
      </h2>
      
      <div className="flex justify-center mb-6">
        <button
          className={`mr-4 px-6 py-3 rounded-full font-semibold transition duration-300 ${
            chartStyle === 'style1' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-green-700'
          }`}
          onClick={() => setChartStyle('style1')}
        >
          Style 1
        </button>
        <button
          className={`mr-4 px-6 py-3 rounded-full font-semibold transition duration-300 ${
            chartStyle === 'style2' ? 'bg-orange-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-orange-700'
          }`}
          onClick={() => setChartStyle('style2')}
        >
          Style 2
        </button>
        <button
          className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
            chartStyle === 'style3' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-blue-700'
          }`}
          onClick={() => setChartStyle('style3')}
        >
          Style 3
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="label" stroke="#ccc" label={{ value: getxaxislabel(), position: 'insideBottom', offset: -5, }} />
          <YAxis stroke="#ccc" label={{ value: 'Data', angle: -90, position: 'insideLeft', offset: 10 }} />
          {/* <YAxis stroke="#ccc" /> */}
          <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444', color: '#fff' }} />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="value" {...getLineStyle()} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartWidget;

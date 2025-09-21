import { useState, useEffect } from 'react';

interface BarGraphProps {
  data?: { label: string; value: number }[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export function BarGraph({ 
  data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 18 }
  ],
  title = 'Sample Data',
  xAxisLabel = 'Categories',
  yAxisLabel = 'Values'
}: BarGraphProps) {
  const [animatedData, setAnimatedData] = useState(data.map(item => ({ ...item, animatedValue: 0 })));
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Find max value for scaling
  const maxValue = Math.max(...data.map(item => item.value), 10);
  
  // Animate bars when component mounts
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setAnimatedData(data.map(item => ({ ...item, animatedValue: item.value })));
    }, 100);
    
    return () => clearTimeout(timer);
  }, [data]);
  
  // Reset animation
  const resetAnimation = () => {
    setAnimatedData(data.map(item => ({ ...item, animatedValue: 0 })));
    setTimeout(() => {
      setAnimatedData(data.map(item => ({ ...item, animatedValue: item.value })));
    }, 50);
  };
  
  // Add new data point
  const addDataPoint = () => {
    const letters = 'FGHIJKLMNOPQRSTUVWXYZ';
    const nextLetter = letters[Math.min(data.length, letters.length - 1)];
    const newValue = Math.floor(Math.random() * 30) + 5;
    
    const newData = [...data, { label: nextLetter, value: newValue }];
    setAnimatedData(newData.map(item => ({ ...item, animatedValue: 0 })));
    setTimeout(() => {
      setAnimatedData(newData.map(item => ({ ...item, animatedValue: item.value })));
    }, 50);
  };
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      
      <div className="flex items-end justify-center h-64 mb-8 border-b border-l border-gray-300 dark:border-slate-600 p-4">
        {animatedData.map((item, index) => (
          <div key={index} className="flex flex-col items-center mx-2 flex-1">
            <div 
              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-t-lg transition-all duration-1000 ease-out"
              style={{ 
                height: `${(item.animatedValue / maxValue) * 90}%`,
                transitionDelay: `${index * 100}ms`
              }}
            ></div>
            <div className="mt-2 text-sm font-medium text-gray-700 dark:text-slate-300">
              {item.label}
            </div>
            <div className="text-xs text-gray-500 dark:text-slate-400">
              {item.value}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mb-4">
        <button
          onClick={resetAnimation}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
        >
          Animate
        </button>
        <button
          onClick={addDataPoint}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
        >
          Add Data
        </button>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-slate-400 mt-4">
        <p>Click "Animate" to replay the bar graph animation.</p>
        <p className="mt-1">Click "Add Data" to add a new data point to the graph.</p>
      </div>
    </div>
  );
}
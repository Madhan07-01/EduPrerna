import { useState } from 'react';

export function NumberLine() {
  const [start, setStart] = useState(-5);
  const [end, setEnd] = useState(5);
  const [point, setPoint] = useState(2);
  
  const range = end - start;
  const position = ((point - start) / range) * 100;

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= start && value <= end) {
      setPoint(value);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Number Line</h3>
      
      <div className="mb-4">
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Start:
            </label>
            <input
              type="number"
              value={start}
              onChange={(e) => setStart(parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              End:
            </label>
            <input
              type="number"
              value={end}
              onChange={(e) => setEnd(parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        
        <div className="relative h-16">
          {/* Number line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-slate-600 transform -translate-y-1/2"></div>
          
          {/* Start and end markers */}
          <div 
            className="absolute top-1/2 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: '0%' }}
          >
            {start}
          </div>
          
          <div 
            className="absolute top-1/2 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: '100%' }}
          >
            {end}
          </div>
          
          {/* Point marker */}
          <div 
            className="absolute top-1/2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${position}%` }}
          >
            {point}
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          Move the point:
        </label>
        <input
          type="range"
          min={start}
          max={end}
          value={point}
          onChange={handlePointChange}
          className="w-full"
        />
        <div className="text-center mt-2 text-gray-700 dark:text-slate-300">
          Current position: {point}
        </div>
      </div>
    </div>
  );
}
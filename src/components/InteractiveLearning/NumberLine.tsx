import { useState } from 'react';

interface NumberLineProps {
  min?: number;
  max?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
}

export function NumberLine({ 
  min = -10, 
  max = 10, 
  initialValue = 0,
  onValueChange 
}: NumberLineProps) {
  const [value, setValue] = useState(initialValue);
  const range = max - min;
  const step = 400 / range; // 400px width for the line

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const handlePointClick = (pointValue: number) => {
    setValue(pointValue);
    onValueChange?.(pointValue);
  };

  // Generate points to display on the number line
  const points = [];
  for (let i = min; i <= max; i++) {
    if (i % 1 === 0) { // Only show integer points
      points.push(i);
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interactive Number Line</h3>
      
      <div className="mb-4">
        <div className="text-center text-2xl font-bold text-blue-600 dark:text-blue-400">
          {value}
        </div>
        <p className="text-sm text-gray-600 dark:text-slate-400 text-center">
          Current Position
        </p>
      </div>

      {/* Number Line Visualization */}
      <div className="relative h-20 mb-6">
        {/* Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-slate-600 transform -translate-y-1/2"></div>
        
        {/* Points */}
        {points.map((point) => {
          const position = ((point - min) / range) * 100;
          return (
            <div 
              key={point}
              className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${position}%` }}
              onClick={() => handlePointClick(point)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                point === value 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {point}
              </div>
              {point === 0 && (
                <div className="text-xs text-center mt-1 font-bold text-gray-900 dark:text-white">0</div>
              )}
            </div>
          );
        })}
        
        {/* Slider Handle */}
        <div 
          className="absolute top-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ left: `${((value - min) / range) * 100}%` }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleSliderChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => {
            const newValue = Math.max(min, value - 1);
            setValue(newValue);
            onValueChange?.(newValue);
          }}
          className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
        >
          -1
        </button>
        <button
          onClick={() => {
            const newValue = Math.min(max, value + 1);
            setValue(newValue);
            onValueChange?.(newValue);
          }}
          className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
        >
          +1
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Click on any number to jump to that position, or drag the blue handle.</p>
        <p className="mt-1">Use the +/- buttons to move one step at a time.</p>
      </div>
    </div>
  );
}
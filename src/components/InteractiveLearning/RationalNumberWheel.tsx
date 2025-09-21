import { useState } from 'react';

export function RationalNumberWheel() {
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(2);
  const [placement, setPlacement] = useState(0.5);
  
  // Calculate decimal value
  const decimalValue = denominator !== 0 ? numerator / denominator : 0;
  
  // Update placement when values change
  const updatePlacement = (num: number, den: number) => {
    if (den !== 0) {
      const value = num / den;
      // Constrain to between -2 and 2 for visualization
      const constrainedValue = Math.max(-2, Math.min(2, value));
      setPlacement(constrainedValue);
    }
  };
  
  // Handle numerator change
  const handleNumeratorChange = (value: number) => {
    setNumerator(value);
    updatePlacement(value, denominator);
  };
  
  // Handle denominator change
  const handleDenominatorChange = (value: number) => {
    // Prevent division by zero
    if (value !== 0) {
      setDenominator(value);
      updatePlacement(numerator, value);
    }
  };
  
  // Handle direct placement change
  const handlePlacementChange = (value: number) => {
    setPlacement(Math.max(-2, Math.min(2, value)));
    // Update numerator/denominator to match (simplified)
    if (Math.abs(value) <= 1) {
      setNumerator(Math.round(value * 10));
      setDenominator(10);
    } else {
      setNumerator(Math.round(value));
      setDenominator(1);
    }
  };
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rational Number Wheel</h3>
      
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-600 dark:text-slate-400 mb-1">Numerator</label>
            <input
              type="number"
              value={numerator}
              onChange={(e) => handleNumeratorChange(parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-center"
            />
          </div>
          
          <div className="text-3xl font-bold">/</div>
          
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-600 dark:text-slate-400 mb-1">Denominator</label>
            <input
              type="number"
              value={denominator}
              onChange={(e) => handleDenominatorChange(parseInt(e.target.value) || 1)}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-center"
            />
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {numerator}/{denominator} = {decimalValue.toFixed(3)}
          </div>
        </div>
      </div>
      
      {/* Number Line Visualization */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-2">Number Line Placement</h4>
        <div className="relative h-16 bg-gray-100 dark:bg-slate-700 rounded-lg">
          {/* Number line markers */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-300 dark:bg-slate-600"></div>
          
          {/* Tick marks */}
          {[-2, -1, 0, 1, 2].map((num) => (
            <div key={num} className="absolute top-4" style={{ left: `${(num + 2) * 25}%` }}>
              <div className="w-0.5 h-4 bg-gray-400 dark:bg-slate-500 mx-auto"></div>
              <div className="text-xs text-gray-600 dark:text-slate-400 mt-1 text-center w-8">
                {num}
              </div>
            </div>
          ))}
          
          {/* Rational number placement */}
          <div 
            className="absolute top-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 shadow-lg cursor-pointer transition-all duration-300"
            style={{ 
              left: `${((placement + 2) / 4) * 100}%`,
              transform: 'translateX(-50%)'
            }}
            onClick={() => handlePlacementChange(placement + 0.1)}
          >
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
              {numerator}/{denominator}
            </div>
          </div>
        </div>
        
        {/* Slider for precise placement */}
        <div className="mt-4">
          <input
            type="range"
            min="-2"
            max="2"
            step="0.01"
            value={placement}
            onChange={(e) => handlePlacementChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-slate-400 mt-1">
            <span>-2</span>
            <span>-1</span>
            <span>0</span>
            <span>1</span>
            <span>2</span>
          </div>
        </div>
      </div>
      
      {/* Examples */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Examples:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-slate-400">
          <li><strong>1/2</strong> = 0.5 (between 0 and 1)</li>
          <li><strong>-3/4</strong> = -0.75 (between -1 and 0)</li>
          <li><strong>5/2</strong> = 2.5 (between 2 and 3)</li>
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Adjust the numerator and denominator to see how rational numbers are placed on the number line.</p>
        <p className="mt-1">Drag the blue dot or use the slider to move the number along the line.</p>
      </div>
    </div>
  );
}
import { useState } from 'react';

export function NumberSystemVisualization() {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [showDensityDemo, setShowDensityDemo] = useState(false);
  const [densityPoint1, setDensityPoint1] = useState(1.5);
  const [densityPoint2, setDensityPoint2] = useState(2.5);
  const [densityPoint3, setDensityPoint3] = useState(2.0);
  
  // Function to determine number type
  const getNumberType = (num: number) => {
    // Check if it's a whole number
    if (Number.isInteger(num) && num >= 0) {
      if (num === 0) return 'Whole Number';
      return 'Natural Number';
    }
    
    // Check if it's an integer
    if (Number.isInteger(num)) {
      return 'Integer';
    }
    
    // Check if it's a rational number (terminating or repeating decimal)
    const str = num.toString();
    if (str.includes('.') && str.length < 20) {
      // Simple check for terminating decimals
      return 'Rational Number';
    }
    
    // For demonstration purposes, we'll classify others as irrational
    return 'Irrational Number';
  };
  
  // Function to demonstrate density property
  const demonstrateDensity = () => {
    const point1 = parseFloat(densityPoint1.toString());
    const point2 = parseFloat(densityPoint2.toString());
    
    if (point1 !== point2) {
      const midpoint = (point1 + point2) / 2;
      setDensityPoint3(midpoint);
      setShowDensityDemo(true);
    }
  };
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Number System Visualization</h3>
      
      {/* Interactive Number Line */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Interactive Number Line</h4>
        <div className="relative h-20 bg-gray-100 dark:bg-slate-700 rounded-lg p-4">
          {/* Number line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-300 dark:bg-slate-600"></div>
          
          {/* Tick marks and labels */}
          {[-3, -2, -1, 0, 1, 2, 3].map((num) => (
            <div key={num} className="absolute top-1/2" style={{ left: `${((num + 3) / 6) * 100}%` }}>
              <div className="w-0.5 h-4 bg-gray-400 dark:bg-slate-500 mx-auto"></div>
              <div className="text-xs text-gray-600 dark:text-slate-400 mt-1 text-center w-8">
                {num}
              </div>
            </div>
          ))}
          
          {/* Draggable point */}
          <div 
            className="absolute top-1/2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 shadow-lg cursor-pointer transition-all duration-300"
            style={{ 
              left: `${((selectedNumber + 3) / 6) * 100}%`,
              transform: 'translateX(-50%) translateY(-50%)'
            }}
          >
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
              {selectedNumber}
            </div>
          </div>
        </div>
        
        {/* Number input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Select a number: {selectedNumber}
          </label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-slate-400 mt-1">
            <span>-3</span>
            <span>-2</span>
            <span>-1</span>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
        
        {/* Number type display */}
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Number Type:</span> {getNumberType(selectedNumber)}
          </div>
        </div>
      </div>
      
      {/* Density Property Demo */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Density Property Demonstration</h4>
        <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">
          Between any two real numbers, there exists another real number.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Point A</label>
            <input
              type="number"
              step="0.1"
              value={densityPoint1}
              onChange={(e) => setDensityPoint1(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Point B</label>
            <input
              type="number"
              step="0.1"
              value={densityPoint2}
              onChange={(e) => setDensityPoint2(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Midpoint</label>
            <input
              type="number"
              step="0.1"
              value={densityPoint3}
              readOnly
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        
        <button
          onClick={demonstrateDensity}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
        >
          Find Midpoint
        </button>
        
        {showDensityDemo && (
          <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-green-800 dark:text-green-200">
              <span className="font-semibold">Result:</span> Between {Math.min(densityPoint1, densityPoint2)} and {Math.max(densityPoint1, densityPoint2)}, we found {densityPoint3}!
            </div>
          </div>
        )}
      </div>
      
      {/* Number System Hierarchy */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Number System Hierarchy</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-slate-300">Natural Numbers (1, 2, 3, ...)</span>
          </div>
          <div className="flex items-center ml-5">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-slate-300">Whole Numbers (0, 1, 2, 3, ...)</span>
          </div>
          <div className="flex items-center ml-10">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-slate-300">Integers (..., -2, -1, 0, 1, 2, ...)</span>
          </div>
          <div className="flex items-center ml-15">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-slate-300">Rational Numbers (p/q form)</span>
          </div>
          <div className="flex items-center ml-15">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-slate-300">Irrational Numbers (√2, π, e, ...)</span>
          </div>
          <div className="flex items-center ml-5">
            <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-slate-300">Real Numbers (All rational & irrational)</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Drag the blue dot on the number line to explore different types of numbers.</p>
        <p className="mt-1">Use the density property demo to see how there's always a number between any two numbers.</p>
      </div>
    </div>
  );
}
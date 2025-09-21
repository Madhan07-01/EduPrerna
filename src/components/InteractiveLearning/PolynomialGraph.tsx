import { useState, useRef, useEffect } from 'react';

export function PolynomialGraph() {
  const [coefficients, setCoefficients] = useState({ a: 1, b: 0, c: 0 }); // ax² + bx + c
  const [selectedPoint, setSelectedPoint] = useState<{x: number, y: number} | null>(null);
  const [showRemainderDemo, setShowRemainderDemo] = useState(false);
  const [divisor, setDivisor] = useState(1);
  const [remainder, setRemainder] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Calculate y value for a given x
  const calculateY = (x: number) => {
    const { a, b, c } = coefficients;
    return a * x * x + b * x + c;
  };
  
  // Generate points for the graph
  const generatePoints = () => {
    const points = [];
    for (let x = -5; x <= 5; x += 0.2) {
      const y = calculateY(x);
      // Scale and translate for SVG coordinates
      const svgX = (x + 5) * 20;
      const svgY = 100 - (y * 10); // Flip Y axis
      points.push({ x: svgX, y: svgY, originalX: x, originalY: y });
    }
    return points;
  };
  
  const points = generatePoints();
  
  // Handle coefficient changes
  const handleCoefficientChange = (coeff: 'a' | 'b' | 'c', value: number) => {
    setCoefficients(prev => ({ ...prev, [coeff]: value }));
  };
  
  // Handle point selection
  const handlePointClick = (point: {x: number, y: number, originalX: number, originalY: number}) => {
    setSelectedPoint({ x: point.originalX, y: point.originalY });
  };
  
  // Demonstrate Remainder Theorem
  const demonstrateRemainderTheorem = () => {
    // For a polynomial p(x) = ax² + bx + c, when divided by (x - divisor),
    // the remainder is p(divisor)
    const { a, b, c } = coefficients;
    const result = a * divisor * divisor + b * divisor + c;
    setRemainder(result);
    setShowRemainderDemo(true);
  };
  
  // Reset to example polynomial
  const resetToExample = () => {
    setCoefficients({ a: 1, b: -2, c: -3 }); // x² - 2x - 3
    setDivisor(2);
    setSelectedPoint(null);
    setShowRemainderDemo(false);
  };
  
  // Initialize with an example
  useEffect(() => {
    resetToExample();
  }, []);
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Polynomial Graph Visualization</h3>
      
      {/* Graph Visualization */}
      <div className="mb-6">
        <div className="relative bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
          <svg 
            ref={svgRef}
            width="400" 
            height="200" 
            className="w-full h-auto border border-gray-300 dark:border-slate-600 rounded"
          >
            {/* Grid */}
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
            
            {/* Axes */}
            <line x1="0" y1="100" x2="400" y2="100" stroke="#4b5563" strokeWidth="1" />
            <line x1="100" y1="0" x2="100" y2="200" stroke="#4b5563" strokeWidth="1" />
            
            {/* Axis labels */}
            <text x="390" y="95" textAnchor="end" fontSize="12" fill="#4b5563">x</text>
            <text x="105" y="15" fontSize="12" fill="#4b5563">y</text>
            
            {/* Graph curve */}
            <polyline
              points={points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            
            {/* Points on the curve */}
            {points.filter((_, i) => i % 5 === 0).map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="3"
                fill={selectedPoint && selectedPoint.x === point.originalX ? "#ef4444" : "#3b82f6"}
                className="cursor-pointer"
                onClick={() => handlePointClick(point)}
              />
            ))}
            
            {/* Selected point label */}
            {selectedPoint && (
              <text
                x={(selectedPoint.x + 5) * 20}
                y={100 - (selectedPoint.y * 10) - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#ef4444"
                fontWeight="bold"
              >
                ({selectedPoint.x.toFixed(1)}, {selectedPoint.y.toFixed(1)})
              </text>
            )}
          </svg>
        </div>
      </div>
      
      {/* Polynomial Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            Coefficient a (x²)
          </label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={coefficients.a}
            onChange={(e) => handleCoefficientChange('a', parseFloat(e.target.value) || 0)}
            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center text-sm font-medium text-gray-800 dark:text-slate-200">
            {coefficients.a}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            Coefficient b (x)
          </label>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={coefficients.b}
            onChange={(e) => handleCoefficientChange('b', parseFloat(e.target.value) || 0)}
            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center text-sm font-medium text-gray-800 dark:text-slate-200">
            {coefficients.b}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            Coefficient c (constant)
          </label>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={coefficients.c}
            onChange={(e) => handleCoefficientChange('c', parseFloat(e.target.value) || 0)}
            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center text-sm font-medium text-gray-800 dark:text-slate-200">
            {coefficients.c}
          </div>
        </div>
      </div>
      
      {/* Current Polynomial Display */}
      <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="text-center font-medium text-blue-800 dark:text-blue-200">
          Current Polynomial: p(x) = {coefficients.a}x² {coefficients.b >= 0 ? '+' : ''}{coefficients.b}x {coefficients.c >= 0 ? '+' : ''}{coefficients.c}
        </div>
      </div>
      
      {/* Remainder Theorem Demo */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Remainder Theorem Demonstration</h4>
        <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">
          When p(x) is divided by (x - a), the remainder is p(a).
        </p>
        
        <div className="flex items-end gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Divisor (a)</label>
            <input
              type="number"
              step="0.1"
              value={divisor}
              onChange={(e) => setDivisor(parseFloat(e.target.value) || 0)}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          
          <button
            onClick={demonstrateRemainderTheorem}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            Calculate Remainder
          </button>
        </div>
        
        {showRemainderDemo && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-green-800 dark:text-green-200">
              <span className="font-semibold">Remainder:</span> p({divisor}) = {coefficients.a}({divisor})² + {coefficients.b}({divisor}) + {coefficients.c} = {remainder}
            </div>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center mb-4">
        <button
          onClick={resetToExample}
          className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
        >
          Reset to Example
        </button>
      </div>
      
      {/* Examples */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Examples:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-slate-400">
          <li><strong>p(x) = x² - 2x - 3</strong> → Zeros at x = -1 and x = 3</li>
          <li><strong>p(x) = x² - 4</strong> → Zeros at x = ±2</li>
          <li><strong>p(x) = x² + 1</strong> → No real zeros (discriminant {'<'} 0)</li>
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Adjust the coefficients to see how the graph changes.</p>
        <p className="mt-1">Click on points to see their coordinates.</p>
        <p className="mt-1">Use the remainder theorem demo to see how division works.</p>
      </div>
    </div>
  );
}
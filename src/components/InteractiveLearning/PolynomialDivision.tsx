import { useState, useRef, useEffect } from 'react';

export function PolynomialDivision() {
  const [dividendCoeffs, setDividendCoeffs] = useState({ a: 1, b: -5, c: 6 }); // ax² + bx + c
  const [divisorCoeffs, setDivisorCoeffs] = useState({ a: 1, b: -2 }); // ax + b
  const [quotient, setQuotient] = useState({ a: 0, b: 0 });
  const [remainder, setRemainder] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Calculate y value for a given x
  const calculateY = (x: number, coeffs: {a: number, b: number, c?: number}) => {
    if (coeffs.c !== undefined) {
      // Quadratic: ax² + bx + c
      return coeffs.a * x * x + coeffs.b * x + coeffs.c;
    } else {
      // Linear: ax + b
      return coeffs.a * x + coeffs.b;
    }
  };
  
  // Generate points for the graph
  const generatePoints = (coeffs: {a: number, b: number, c?: number}) => {
    const points = [];
    for (let x = -5; x <= 5; x += 0.2) {
      const y = calculateY(x, coeffs);
      // Scale and translate for SVG coordinates
      const svgX = (x + 5) * 20;
      const svgY = 100 - (y * 10); // Flip Y axis
      points.push({ x: svgX, y: svgY, originalX: x, originalY: y });
    }
    return points;
  };
  
  // Perform polynomial division
  const performDivision = () => {
    // For dividend ax² + bx + c divided by divisor px + q
    const a = dividendCoeffs.a; // coefficient of x²
    const b = dividendCoeffs.b; // coefficient of x
    const c = dividendCoeffs.c; // constant term
    const p = divisorCoeffs.a;  // coefficient of x in divisor
    const q = divisorCoeffs.b;  // constant term in divisor
    
    // Quotient will be of the form rx + s
    // By comparing coefficients:
    // ax² + bx + c = (px + q)(rx + s) + remainder
    // ax² + bx + c = prx² + (ps + qr)x + qs + remainder
    
    // Therefore:
    // a = pr → r = a/p
    // b = ps + qr → s = (b - qr)/p = (b - q*a/p)/p = (bp - qa)/p²
    
    const r = a / p;
    const s = (b * p - q * a) / (p * p);
    const rem = c - q * s;
    
    setQuotient({ a: r, b: s });
    setRemainder(rem);
    setShowSteps(true);
  };
  
  // Reset to example
  const resetToExample = () => {
    setDividendCoeffs({ a: 1, b: -5, c: 6 }); // x² - 5x + 6
    setDivisorCoeffs({ a: 1, b: -2 }); // x - 2
    setQuotient({ a: 0, b: 0 });
    setRemainder(0);
    setShowSteps(false);
  };
  
  // Initialize with an example
  useEffect(() => {
    resetToExample();
  }, []);
  
  const dividendPoints = generatePoints(dividendCoeffs);
  const divisorPoints = generatePoints(divisorCoeffs);
  const quotientPoints = generatePoints(quotient);
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Polynomial Division Visualizer</h3>
      
      {/* Graph Visualization */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Graph Visualization</h4>
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
            
            {/* Dividend curve (red) */}
            <polyline
              points={dividendPoints.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
            />
            
            {/* Divisor curve (blue) */}
            <polyline
              points={divisorPoints.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            
            {/* Quotient curve (green) */}
            {showSteps && (
              <polyline
                points={quotientPoints.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
      </div>
      
      {/* Polynomial Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Dividend (Numerator)</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">
                Coefficient of x² (a)
              </label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={dividendCoeffs.a}
                onChange={(e) => setDividendCoeffs(prev => ({ ...prev, a: parseFloat(e.target.value) || 0 }))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-sm font-medium text-gray-800 dark:text-slate-200">
                {dividendCoeffs.a}
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">
                Coefficient of x (b)
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={dividendCoeffs.b}
                onChange={(e) => setDividendCoeffs(prev => ({ ...prev, b: parseFloat(e.target.value) || 0 }))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-sm font-medium text-gray-800 dark:text-slate-200">
                {dividendCoeffs.b}
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">
                Constant term (c)
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={dividendCoeffs.c || 0}
                onChange={(e) => setDividendCoeffs(prev => ({ ...prev, c: parseFloat(e.target.value) || 0 }))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-sm font-medium text-gray-800 dark:text-slate-200">
                {dividendCoeffs.c}
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded">
            <div className="text-center text-sm font-medium text-red-800 dark:text-red-200">
              Dividend: {dividendCoeffs.a}x² {dividendCoeffs.b >= 0 ? '+' : ''}{dividendCoeffs.b}x {dividendCoeffs.c >= 0 ? '+' : ''}{dividendCoeffs.c}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Divisor (Denominator)</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">
                Coefficient of x (a)
              </label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={divisorCoeffs.a}
                onChange={(e) => setDivisorCoeffs(prev => ({ ...prev, a: parseFloat(e.target.value) || 0 }))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-sm font-medium text-gray-800 dark:text-slate-200">
                {divisorCoeffs.a}
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">
                Constant term (b)
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={divisorCoeffs.b}
                onChange={(e) => setDivisorCoeffs(prev => ({ ...prev, b: parseFloat(e.target.value) || 0 }))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-sm font-medium text-gray-800 dark:text-slate-200">
                {divisorCoeffs.b}
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
            <div className="text-center text-sm font-medium text-blue-800 dark:text-blue-200">
              Divisor: {divisorCoeffs.a}x {divisorCoeffs.b >= 0 ? '+' : ''}{divisorCoeffs.b}
            </div>
          </div>
        </div>
      </div>
      
      {/* Division Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={performDivision}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Perform Polynomial Division
        </button>
      </div>
      
      {/* Results */}
      {showSteps && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Division Result</h4>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                Division Algorithm:
              </div>
              <div className="text-gray-800 dark:text-gray-200">
                <div className="mb-2">
                  <span className="font-mono">
                    ({dividendCoeffs.a}x² {dividendCoeffs.b >= 0 ? '+' : ''}{dividendCoeffs.b}x {dividendCoeffs.c >= 0 ? '+' : ''}{dividendCoeffs.c}) = 
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-mono">
                    ({divisorCoeffs.a}x {divisorCoeffs.b >= 0 ? '+' : ''}{divisorCoeffs.b}) × 
                    ({quotient.a.toFixed(1)}x {quotient.b >= 0 ? '+' : ''}{quotient.b.toFixed(1)}) + 
                    {remainder.toFixed(1)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Quotient:</span> {quotient.a.toFixed(1)}x {quotient.b >= 0 ? '+' : ''}{quotient.b.toFixed(1)}
                </div>
                <div>
                  <span className="font-semibold">Remainder:</span> {remainder.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
          <li><strong>(x² - 5x + 6) ÷ (x - 2) = (x - 3)</strong> with remainder 0</li>
          <li><strong>(x² - 3x + 2) ÷ (x - 1) = (x - 2)</strong> with remainder 0</li>
          <li><strong>(2x² + 3x - 2) ÷ (x + 2) = (2x - 1)</strong> with remainder 0</li>
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Adjust the coefficients to see how polynomial division works.</p>
        <p className="mt-1">Red curve represents the dividend, blue represents the divisor, and green represents the quotient.</p>
      </div>
    </div>
  );
}
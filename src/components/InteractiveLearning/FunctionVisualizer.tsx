import React, { useState, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

const FunctionVisualizer: React.FC = () => {
  const [functionType, setFunctionType] = useState<string>('linear');
  const [coefficients, setCoefficients] = useState<{a: number; b: number; c: number}>({a: 1, b: 0, c: 0});
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<number | null>(null);
  const [points, setPoints] = useState<Point[]>([]);

  // Predefined functions
  const functions: Record<string, (x: number) => number> = {
    linear: (x: number) => coefficients.a * x + coefficients.b,
    quadratic: (x: number) => coefficients.a * x * x + coefficients.b * x + coefficients.c,
    cubic: (x: number) => coefficients.a * x * x * x + coefficients.b * x * x + coefficients.c * x,
    exponential: (x: number) => coefficients.a * Math.pow(Math.E, coefficients.b * x),
    sine: (x: number) => coefficients.a * Math.sin(coefficients.b * x + coefficients.c),
  };

  // Calculate output when input changes
  useEffect(() => {
    if (inputValue !== null) {
      const result = functions[functionType](inputValue);
      setOutputValue(result);
    }
  }, [inputValue, functionType, coefficients]);

  // Generate points for graph
  useEffect(() => {
    const newPoints: Point[] = [];
    const start = -5;
    const end = 5;
    const step = (end - start) / 100;
    
    for (let x = start; x <= end; x += step) {
      try {
        const y = functions[functionType](x);
        // Only add points that are within reasonable bounds
        if (Math.abs(y) < 1000) {
          newPoints.push({x, y});
        }
      } catch (e) {
        // Skip points that cause errors
      }
    }
    
    setPoints(newPoints);
  }, [functionType, coefficients]);

  const handleCoefficientChange = (coeff: 'a' | 'b' | 'c', value: string) => {
    const numValue = parseFloat(value) || 0;
    setCoefficients(prev => ({
      ...prev,
      [coeff]: numValue
    }));
  };

  const renderGraph = () => {
    const width = 400;
    const height = 300;
    const start = -5;
    const end = 5;
    const range = end - start;
    
    // Find min and max y values for scaling
    const yValues = points.map(p => p.y);
    const minY = yValues.length ? Math.min(...yValues) : -10;
    const maxY = yValues.length ? Math.max(...yValues) : 10;
    const yRange = maxY - minY || 1;
    
    // Scale functions
    const scaleX = (x: number) => ((x - start) / range) * width;
    const scaleY = (y: number) => height - ((y - minY) / yRange) * height;
    
    return (
      <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
        <svg width={width} height={height} className="border border-gray-200">
          {/* Grid lines */}
          {[...Array(11)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * (width / 10)}
              y1={0}
              x2={i * (width / 10)}
              y2={height}
              stroke="#f0f0f0"
              strokeWidth={1}
            />
          ))}
          {[...Array(11)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * (height / 10)}
              x2={width}
              y2={i * (height / 10)}
              stroke="#f0f0f0"
              strokeWidth={1}
            />
          ))}
          
          {/* Axes */}
          <line
            x1={0}
            y1={scaleY(0)}
            x2={width}
            y2={scaleY(0)}
            stroke="#000"
            strokeWidth={1}
          />
          <line
            x1={scaleX(0)}
            y1={0}
            x2={scaleX(0)}
            y2={height}
            stroke="#000"
            strokeWidth={1}
          />
          
          {/* Function curve */}
          {points.length > 1 && (
            <polyline
              points={points.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          )}
          
          {/* Input/output point */}
          {outputValue !== null && (
            <circle
              cx={scaleX(inputValue)}
              cy={scaleY(outputValue)}
              r={5}
              fill="#ef4444"
            />
          )}
        </svg>
        
        <div className="mt-2 text-sm text-gray-600">
          Domain: [{start}, {end}]
        </div>
      </div>
    );
  };

  return (
    <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-blue-800 mb-4">Function Visualizer</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Function Type
            </label>
            <select
              value={functionType}
              onChange={(e) => setFunctionType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="linear">Linear (ax + b)</option>
              <option value="quadratic">Quadratic (ax² + bx + c)</option>
              <option value="cubic">Cubic (ax³ + bx² + cx)</option>
              <option value="exponential">Exponential (ae^(bx))</option>
              <option value="sine">Sine (a·sin(bx + c))</option>
            </select>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">a</label>
              <input
                type="number"
                value={coefficients.a}
                onChange={(e) => handleCoefficientChange('a', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">b</label>
              <input
                type="number"
                value={coefficients.b}
                onChange={(e) => handleCoefficientChange('b', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">c</label>
              <input
                type="number"
                value={coefficients.c}
                onChange={(e) => handleCoefficientChange('c', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Input Value (x)
            </label>
            <input
              type="number"
              step="0.1"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Output f(x) =</div>
            <div className="text-xl font-bold text-blue-600">
              {outputValue !== null ? outputValue.toFixed(2) : '—'}
            </div>
          </div>
        </div>
        
        {/* Graph */}
        <div>
          {renderGraph()}
          <div className="mt-4 text-sm text-gray-600">
            <p className="mb-1">• Adjust coefficients to see how they affect the function</p>
            <p className="mb-1">• Change input value to see real-time mapping</p>
            <p>• Red dot shows the current input/output pair</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionVisualizer;
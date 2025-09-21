import React, { useState, useEffect } from 'react';

const InverseTrigUnitCircle: React.FC = () => {
  const [angle, setAngle] = useState<number>(0); // in degrees
  const [inverseFunction, setInverseFunction] = useState<string>('sin');
  const [inputValue, setInputValue] = useState<number>(0);
  const [resultAngle, setResultAngle] = useState<number | null>(null);

  // Convert degrees to radians
  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
  
  // Convert radians to degrees
  const toDegrees = (radians: number): number => radians * (180 / Math.PI);

  // Calculate inverse trigonometric functions
  useEffect(() => {
    if (inputValue === null) return;
    
    let result: number | null = null;
    
    try {
      switch (inverseFunction) {
        case 'sin':
          if (inputValue >= -1 && inputValue <= 1) {
            result = Math.asin(inputValue);
          }
          break;
        case 'cos':
          if (inputValue >= -1 && inputValue <= 1) {
            result = Math.acos(inputValue);
          }
          break;
        case 'tan':
          result = Math.atan(inputValue);
          break;
        default:
          result = null;
      }
      
      if (result !== null) {
        setResultAngle(toDegrees(result));
      } else {
        setResultAngle(null);
      }
    } catch (e) {
      setResultAngle(null);
    }
  }, [inputValue, inverseFunction]);

  // Animation function
  const animateToAngle = (targetAngle: number) => {
    const startAngle = angle;
    const diff = targetAngle - startAngle;
    const duration = 1000; // 1 second
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startAngle + diff * easeProgress;
      
      setAngle(currentAngle);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setInputValue(numValue);
    } else {
      setInputValue(0);
    }
  };

  // Handle angle change
  const handleAngleChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setAngle(numValue);
    }
  };

  // Render the unit circle
  const renderUnitCircle = () => {
    const radius = 100;
    const centerX = 150;
    const centerY = 150;
    
    // Calculate point on circle
    const rad = toRadians(angle);
    const x = centerX + radius * Math.cos(rad);
    const y = centerY - radius * Math.sin(rad); // SVG y-axis is inverted
    
    // Calculate reference angle for inverse functions
    const refRad = resultAngle !== null ? toRadians(resultAngle) : 0;
    const refX = centerX + radius * Math.cos(refRad);
    const refY = centerY - radius * Math.sin(refRad);
    
    return (
      <div className="flex flex-col items-center">
        <svg width="300" height="300" className="border-2 border-gray-300 rounded-full">
          {/* Grid lines */}
          <circle cx={centerX} cy={centerY} r={radius} stroke="#ddd" strokeWidth={1} fill="none" />
          <line x1={centerX - radius} y1={centerY} x2={centerX + radius} y2={centerY} stroke="#eee" strokeWidth={1} />
          <line x1={centerX} y1={centerY - radius} x2={centerX} y2={centerY + radius} stroke="#eee" strokeWidth={1} />
          
          {/* Unit circle */}
          <circle cx={centerX} cy={centerY} r={radius} stroke="#3b82f6" strokeWidth={2} fill="none" />
          
          {/* Axes */}
          <line x1={centerX - radius - 20} y1={centerY} x2={centerX + radius + 20} y2={centerY} stroke="#000" strokeWidth={1.5} />
          <line x1={centerX} y1={centerY - radius - 20} x2={centerX} y2={centerY + radius + 20} stroke="#000" strokeWidth={1.5} />
          
          {/* Axis labels */}
          <text x={centerX + radius + 10} y={centerY - 5} fontSize="12" fill="#000">1</text>
          <text x={centerX - radius - 20} y={centerY - 5} fontSize="12" fill="#000">-1</text>
          <text x={centerX + 5} y={centerY - radius - 10} fontSize="12" fill="#000">1</text>
          <text x={centerX + 5} y={centerY + radius + 20} fontSize="12" fill="#000">-1</text>
          
          {/* Current angle line */}
          <line x1={centerX} y1={centerY} x2={x} y2={y} stroke="#ef4444" strokeWidth={2} />
          
          {/* Reference angle line for inverse functions */}
          {resultAngle !== null && (
            <line x1={centerX} y1={centerY} x2={refX} y2={refY} stroke="#10b981" strokeWidth={2} strokeDasharray="5,5" />
          )}
          
          {/* Point on circle */}
          <circle cx={x} cy={y} r={5} fill="#ef4444" />
          
          {/* Reference point for inverse functions */}
          {resultAngle !== null && (
            <circle cx={refX} cy={refY} r={5} fill="#10b981" />
          )}
          
          {/* Center point */}
          <circle cx={centerX} cy={centerY} r={3} fill="#000" />
          
          {/* Angle arc */}
          <path
            d={`
              M ${centerX + 30 * Math.cos(0)} ${centerY - 30 * Math.sin(0)}
              A 30 30 0 ${angle > 180 ? 1 : 0} 0 
              ${centerX + 30 * Math.cos(rad)} ${centerY - 30 * Math.sin(rad)}
            `}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={2}
          />
          
          {/* Angle label */}
          <text x={centerX + 40 * Math.cos(rad / 2)} y={centerY - 40 * Math.sin(rad / 2)} 
                fontSize="14" fill="#f59e0b" textAnchor="middle">
            {angle.toFixed(1)}°
          </text>
        </svg>
        
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => animateToAngle((angle - 15 + 360) % 360)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            ←
          </button>
          <button
            onClick={() => animateToAngle((angle + 15) % 360)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-purple-800 mb-4">Inverse Trigonometric Functions Unit Circle</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inverse Function
            </label>
            <select
              value={inverseFunction}
              onChange={(e) => setInverseFunction(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="sin">sin⁻¹ (Arcsine)</option>
              <option value="cos">cos⁻¹ (Arccosine)</option>
              <option value="tan">tan⁻¹ (Arctangent)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Input Value
            </label>
            <input
              type="number"
              step="0.1"
              min={inverseFunction === 'tan' ? undefined : "-1"}
              max={inverseFunction === 'tan' ? undefined : "1"}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              {inverseFunction !== 'tan' ? 'Range: [-1, 1]' : 'Any real number'}
            </p>
          </div>
          
          <div className="p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">
              Result: {inverseFunction}⁻¹({inputValue}) = 
              <span className="font-bold text-purple-600">
                {resultAngle !== null ? ` ${resultAngle.toFixed(2)}°` : ' undefined'}
              </span>
            </div>
            {resultAngle !== null && (
              <div className="text-xs text-gray-500 mt-1">
                Principal value in range: {
                  inverseFunction === 'sin' ? '[-90°, 90°]' :
                  inverseFunction === 'cos' ? '[0°, 180°]' : '(-90°, 90°)'
                }
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Manual Angle Control
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => handleAngleChange(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0°</span>
              <span>90°</span>
              <span>180°</span>
              <span>270°</span>
              <span>360°</span>
            </div>
          </div>
        </div>
        
        {/* Unit Circle Visualization */}
        <div>
          {renderUnitCircle()}
          <div className="mt-4 text-sm text-gray-600">
            <p className="mb-1">• <span className="text-red-500">Red line</span>: Current angle</p>
            <p className="mb-1">• <span className="text-green-500">Green dashed line</span>: Inverse function result</p>
            <p className="mb-1">• Drag slider or use buttons to rotate</p>
            <p>• See how inverse functions map values back to angles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverseTrigUnitCircle;
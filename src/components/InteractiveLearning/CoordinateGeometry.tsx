import { useState, useRef } from 'react';

export function CoordinateGeometry() {
  const [points, setPoints] = useState([
    { id: 1, x: -3, y: 2 },
    { id: 2, x: 4, y: -1 }
  ]);
  const [newPoint, setNewPoint] = useState({ x: 0, y: 0 });
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);
  const [showDistance, setShowDistance] = useState(false);
  const [showMidpoint, setShowMidpoint] = useState(false);
  const [midpoint, setMidpoint] = useState({ x: 0.5, y: 0.5 });
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Calculate distance between two points
  const calculateDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };
  
  // Calculate midpoint between two points
  const calculateMidpoint = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2
    };
  };
  
  // Add a new point
  const addPoint = () => {
    const newId = points.length > 0 ? Math.max(...points.map(p => p.id)) + 1 : 1;
    setPoints([...points, { id: newId, x: newPoint.x, y: newPoint.y }]);
    setNewPoint({ x: 0, y: 0 });
  };
  
  // Remove a point
  const removePoint = (id: number) => {
    setPoints(points.filter(p => p.id !== id));
    if (selectedPointId === id) {
      setSelectedPointId(null);
    }
  };
  
  // Update a point's coordinates
  const updatePoint = (id: number, x: number, y: number) => {
    setPoints(points.map(p => p.id === id ? { ...p, x, y } : p));
  };
  
  // Select a point
  const selectPoint = (id: number) => {
    setSelectedPointId(id);
  };
  
  // Calculate distance between first two points
  const distance = points.length >= 2 ? calculateDistance(points[0], points[1]) : 0;
  
  // Calculate midpoint between first two points
  const midpointResult = points.length >= 2 ? calculateMidpoint(points[0], points[1]) : { x: 0, y: 0 };
  
  // Show distance calculation
  const showDistanceCalculation = () => {
    setShowDistance(true);
    setTimeout(() => setShowDistance(false), 3000);
  };
  
  // Show midpoint calculation
  const showMidpointCalculation = () => {
    if (points.length >= 2) {
      setMidpoint(midpointResult);
      setShowMidpoint(true);
      setTimeout(() => setShowMidpoint(false), 3000);
    }
  };
  
  // Reset to example points
  const resetToExample = () => {
    setPoints([
      { id: 1, x: -3, y: 2 },
      { id: 2, x: 4, y: -1 }
    ]);
    setSelectedPointId(null);
    setShowDistance(false);
    setShowMidpoint(false);
  };
  
  // Convert Cartesian coordinates to SVG coordinates
  const toSvgX = (x: number) => (x + 10) * 20;
  const toSvgY = (y: number) => (10 - y) * 20;
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Coordinate Geometry Visualization</h3>
      
      {/* Coordinate Plane */}
      <div className="mb-6">
        <div className="relative bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
          <svg 
            ref={svgRef}
            width="400" 
            height="400" 
            className="w-full h-auto border border-gray-300 dark:border-slate-600 rounded"
          >
            {/* Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Axes */}
            <line x1="0" y1="200" x2="400" y2="200" stroke="#4b5563" strokeWidth="1" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="#4b5563" strokeWidth="1" />
            
            {/* Axis labels */}
            <text x="390" y="195" textAnchor="end" fontSize="12" fill="#4b5563">x</text>
            <text x="205" y="15" fontSize="12" fill="#4b5563">y</text>
            
            {/* Quadrant labels */}
            <text x="300" y="50" textAnchor="middle" fontSize="14" fill="#6b7280">I (+,+)</text>
            <text x="100" y="50" textAnchor="middle" fontSize="14" fill="#6b7280">II (-,+)</text>
            <text x="100" y="350" textAnchor="middle" fontSize="14" fill="#6b7280">III (-,-)</text>
            <text x="300" y="350" textAnchor="middle" fontSize="14" fill="#6b7280">IV (+,-)</text>
            
            {/* Points */}
            {points.map(point => (
              <g key={point.id}>
                <circle
                  cx={toSvgX(point.x)}
                  cy={toSvgY(point.y)}
                  r="8"
                  fill={selectedPointId === point.id ? "#ef4444" : "#3b82f6"}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onClick={() => selectPoint(point.id)}
                />
                <text
                  x={toSvgX(point.x)}
                  y={toSvgY(point.y) - 15}
                  textAnchor="middle"
                  fontSize="12"
                  fill={selectedPointId === point.id ? "#ef4444" : "#3b82f6"}
                  fontWeight="bold"
                >
                  ({point.x}, {point.y})
                </text>
              </g>
            ))}
            
            {/* Line between first two points */}
            {points.length >= 2 && (
              <line
                x1={toSvgX(points[0].x)}
                y1={toSvgY(points[0].y)}
                x2={toSvgX(points[1].x)}
                y2={toSvgY(points[1].y)}
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}
            
            {/* Midpoint indicator */}
            {showMidpoint && (
              <circle
                cx={toSvgX(midpoint.x)}
                cy={toSvgY(midpoint.y)}
                r="6"
                fill="#f59e0b"
                stroke="white"
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
      </div>
      
      {/* Points List */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Points</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {points.map(point => (
            <div key={point.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-700 rounded">
              <div 
                className={`w-4 h-4 rounded-full ${selectedPointId === point.id ? 'bg-red-500' : 'bg-blue-500'}`}
              ></div>
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={point.x}
                  onChange={(e) => updatePoint(point.id, parseFloat(e.target.value) || 0, point.y)}
                  className="px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
                <input
                  type="number"
                  value={point.y}
                  onChange={(e) => updatePoint(point.id, point.x, parseFloat(e.target.value) || 0)}
                  className="px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
              <button
                onClick={() => removePoint(point.id)}
                className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add Point */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Add New Point</h4>
        <div className="flex items-end gap-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">X-coordinate</label>
            <input
              type="number"
              value={newPoint.x}
              onChange={(e) => setNewPoint({...newPoint, x: parseFloat(e.target.value) || 0})}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Y-coordinate</label>
            <input
              type="number"
              value={newPoint.y}
              onChange={(e) => setNewPoint({...newPoint, y: parseFloat(e.target.value) || 0})}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <button
            onClick={addPoint}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Calculations */}
      {points.length >= 2 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Distance</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {distance.toFixed(2)}
                </div>
              </div>
              <button
                onClick={showDistanceCalculation}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
              >
                Show Formula
              </button>
            </div>
            {showDistance && (
              <div className="mt-2 text-xs text-blue-700 dark:text-blue-300">
                d = √[({points[1].x} - ({points[0].x}))² + ({points[1].y} - ({points[0].y}))²] = {distance.toFixed(2)}
              </div>
            )}
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-green-800 dark:text-green-200">Midpoint</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  ({midpointResult.x.toFixed(1)}, {midpointResult.y.toFixed(1)})
                </div>
              </div>
              <button
                onClick={showMidpointCalculation}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
              >
                Show Formula
              </button>
            </div>
            {showMidpoint && (
              <div className="mt-2 text-xs text-green-700 dark:text-green-300">
                M = (({points[0].x} + {points[1].x})/2, ({points[0].y} + {points[1].y})/2) = ({midpointResult.x.toFixed(1)}, {midpointResult.y.toFixed(1)})
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-3 mb-4">
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
          <li>Distance between (-3, 2) and (4, -1) = √[(4-(-3))² + (-1-2)²] = √[49 + 9] = √58 ≈ 7.62</li>
          <li>Midpoint of (-3, 2) and (4, -1) = ((-3+4)/2, (2+(-1))/2) = (0.5, 0.5)</li>
          <li>Point (0, -4) lies on the y-axis since x = 0</li>
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Click on points to select them. Drag points to move them (using the input fields).</p>
        <p className="mt-1">Add new points or remove existing ones to explore different configurations.</p>
      </div>
    </div>
  );
}
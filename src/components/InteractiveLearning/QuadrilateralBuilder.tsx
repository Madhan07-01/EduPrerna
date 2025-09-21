import { useState, useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

export function QuadrilateralBuilder() {
  const [points, setPoints] = useState<Point[]>([
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 }
  ]);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [quadrilateralType, setQuadrilateralType] = useState('Square');
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Calculate properties
  const calculateSideLengths = () => {
    const lengths = [];
    for (let i = 0; i < 4; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % 4];
      const length = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      lengths.push(length);
    }
    return lengths;
  };
  
  const calculateAngles = () => {
    const angles = [];
    for (let i = 0; i < 4; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % 4];
      const p3 = points[(i + 2) % 4];
      
      // Calculate vectors
      const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
      const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
      
      // Calculate angle using dot product
      const dot = v1.x * v2.x + v1.y * v2.y;
      const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
      
      if (mag1 === 0 || mag2 === 0) {
        angles.push(0);
      } else {
        const angle = Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI);
        angles.push(angle);
      }
    }
    return angles;
  };
  
  const sideLengths = calculateSideLengths();
  const angles = calculateAngles();
  
  // Identify quadrilateral type
  const identifyQuadrilateral = () => {
    const sides = [...sideLengths];
    const sortedSides = [...sides].sort((a, b) => a - b);
    const sortedAngles = [...angles].sort((a, b) => a - b);
    
    // Check if all sides are equal (within tolerance)
    const allSidesEqual = Math.abs(sortedSides[0] - sortedSides[3]) < 5;
    
    // Check if all angles are 90 degrees (within tolerance)
    const allAngles90 = angles.every(angle => Math.abs(angle - 90) < 5);
    
    // Check if opposite sides are equal
    const oppositeSidesEqual = 
      Math.abs(sides[0] - sides[2]) < 5 && 
      Math.abs(sides[1] - sides[3]) < 5;
    
    // Check if one pair of sides is parallel (trapezium)
    // Simplified check: see if opposite sides are roughly parallel
    const isTrapezium = false; // Simplified for this example
    
    if (allSidesEqual && allAngles90) return 'Square';
    if (allAngles90 && oppositeSidesEqual) return 'Rectangle';
    if (allSidesEqual) return 'Rhombus';
    if (oppositeSidesEqual) return 'Parallelogram';
    if (isTrapezium) return 'Trapezium';
    return 'Quadrilateral';
  };
  
  useEffect(() => {
    setQuadrilateralType(identifyQuadrilateral());
  }, [points]);
  
  // Handle point drag
  const handlePointMouseDown = (index: number) => {
    setSelectedPoint(index);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectedPoint === null || !svgRef.current) return;
    
    const svg = svgRef.current;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const cursorPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    
    setPoints(prev => {
      const newPoints = [...prev];
      newPoints[selectedPoint] = { 
        x: Math.max(20, Math.min(380, cursorPoint.x)), 
        y: Math.max(20, Math.min(380, cursorPoint.y)) 
      };
      return newPoints;
    });
  };
  
  const handleMouseUp = () => {
    setSelectedPoint(null);
  };
  
  // Reset to specific shapes
  const resetToSquare = () => {
    setPoints([
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 }
    ]);
  };
  
  const resetToRectangle = () => {
    setPoints([
      { x: 80, y: 100 },
      { x: 220, y: 100 },
      { x: 220, y: 200 },
      { x: 80, y: 200 }
    ]);
  };
  
  const resetToRhombus = () => {
    setPoints([
      { x: 150, y: 80 },
      { x: 220, y: 150 },
      { x: 150, y: 220 },
      { x: 80, y: 150 }
    ]);
  };
  
  const resetToParallelogram = () => {
    setPoints([
      { x: 80, y: 100 },
      { x: 200, y: 100 },
      { x: 220, y: 200 },
      { x: 100, y: 200 }
    ]);
  };
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quadrilateral Builder</h3>
      
      {/* Shape Visualization */}
      <div className="mb-6">
        <div className="relative bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
          <svg 
            ref={svgRef}
            width="400" 
            height="400" 
            className="w-full h-auto border border-gray-300 dark:border-slate-600 rounded"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Quadrilateral */}
            <polygon
              points={points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="rgba(59, 130, 246, 0.2)"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            
            {/* Diagonals */}
            <line 
              x1={points[0].x} 
              y1={points[0].y} 
              x2={points[2].x} 
              y2={points[2].y} 
              stroke="#ef4444" 
              strokeWidth="1" 
              strokeDasharray="4,2"
            />
            <line 
              x1={points[1].x} 
              y1={points[1].y} 
              x2={points[3].x} 
              y2={points[3].y} 
              stroke="#ef4444" 
              strokeWidth="1" 
              strokeDasharray="4,2"
            />
            
            {/* Points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="8"
                fill={selectedPoint === index ? "#ef4444" : "#3b82f6"}
                stroke="white"
                strokeWidth="2"
                onMouseDown={() => handlePointMouseDown(index)}
                className="cursor-move"
              />
            ))}
          </svg>
        </div>
      </div>
      
      {/* Shape Information */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Shape Type</h4>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {quadrilateralType}
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Properties</h4>
          <div className="text-sm text-green-700 dark:text-green-300">
            <div>Sides: {sideLengths.map((l, i) => 
              <span key={i}>{l.toFixed(0)}{i < 3 ? ', ' : ''}</span>
            )}</div>
            <div>Angles: {angles.map((a, i) => 
              <span key={i}>{a.toFixed(0)}°{i < 3 ? ', ' : ''}</span>
            )}</div>
          </div>
        </div>
      </div>
      
      {/* Shape Controls */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Reset to Shape:</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={resetToSquare}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            Square
          </button>
          <button
            onClick={resetToRectangle}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            Rectangle
          </button>
          <button
            onClick={resetToRhombus}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            Rhombus
          </button>
          <button
            onClick={resetToParallelogram}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            Parallelogram
          </button>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">How to Use:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-slate-400">
          <li>Drag the blue circles to move the vertices of the quadrilateral</li>
          <li>See how the shape properties change in real-time</li>
          <li>Diagonals are shown as red dashed lines</li>
          <li>Use the shape buttons to reset to common quadrilaterals</li>
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Explore how changing the vertices affects the shape's properties.</p>
        <p className="mt-1">Notice how sides and angles change as you manipulate the quadrilateral.</p>
      </div>
    </div>
  );
}
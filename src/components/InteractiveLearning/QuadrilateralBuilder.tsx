import { useState, useRef } from 'react';

export function QuadrilateralBuilder() {
  const [sides, setSides] = useState([5, 5, 5, 5]);
  const [angles, setAngles] = useState([90, 90, 90, 90]);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleSideChange = (index: number, value: number) => {
    const newSides = [...sides];
    newSides[index] = Math.max(1, Math.min(10, value));
    setSides(newSides);
  };

  const handleAngleChange = (index: number, value: number) => {
    const newAngles = [...angles];
    newAngles[index] = Math.max(1, Math.min(179, value));
    setAngles(newAngles);
  };

  // Calculate vertices for the quadrilateral
  const calculateVertices = () => {
    const vertices = [{ x: 50, y: 50 }];
    let currentX = 50;
    let currentY = 50;
    
    for (let i = 0; i < 3; i++) {
      const angle = angles[i] * Math.PI / 180;
      const side = sides[i];
      currentX += side * Math.cos(angle);
      currentY += side * Math.sin(angle);
      vertices.push({ x: currentX, y: currentY });
    }
    
    return vertices;
  };

  const vertices = calculateVertices();
  const pathData = `M ${vertices.map(v => `${v.x},${v.y}`).join(' L ')} Z`;

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quadrilateral Builder</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Side Lengths */}
        <div>
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Side Lengths</h4>
          {sides.map((side, index) => (
            <div key={index} className="flex items-center mb-2">
              <label className="w-20 text-sm text-gray-700 dark:text-slate-300">
                Side {index + 1}:
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={side}
                onChange={(e) => handleSideChange(index, parseInt(e.target.value))}
                className="flex-1 mr-2"
              />
              <span className="w-10 text-sm text-gray-700 dark:text-slate-300">
                {side}
              </span>
            </div>
          ))}
        </div>
        
        {/* Angles */}
        <div>
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Angles (degrees)</h4>
          {angles.map((angle, index) => (
            <div key={index} className="flex items-center mb-2">
              <label className="w-20 text-sm text-gray-700 dark:text-slate-300">
                Angle {index + 1}:
              </label>
              <input
                type="range"
                min="1"
                max="179"
                value={angle}
                onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
                className="flex-1 mr-2"
              />
              <span className="w-10 text-sm text-gray-700 dark:text-slate-300">
                {angle}°
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visualization */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Quadrilateral Visualization</h4>
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
          <svg 
            ref={svgRef}
            width="300" 
            height="300" 
            viewBox="0 0 200 200"
            className="mx-auto"
          >
            <path
              d={pathData}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            {vertices.map((vertex, index) => (
              <circle
                key={index}
                cx={vertex.x}
                cy={vertex.y}
                r="3"
                fill="#ef4444"
              />
            ))}
          </svg>
        </div>
      </div>
      
      {/* Properties */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Properties</h4>
        <div className="text-blue-700 dark:text-blue-300 text-sm">
          <p>Sum of angles: {angles.reduce((sum, angle) => sum + angle, 0)}°</p>
          <p>Perimeter: {sides.reduce((sum, side) => sum + side, 0)} units</p>
          <p className="mt-1">Note: This is a simplified visualization. Actual quadrilaterals may vary based on constraints.</p>
        </div>
      </div>
    </div>
  );
}

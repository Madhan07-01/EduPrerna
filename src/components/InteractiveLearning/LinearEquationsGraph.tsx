import { useState, useRef } from 'react';

export function LinearEquationsGraph() {
  const [equations, setEquations] = useState([
    { id: 1, a: 2, b: 3, c: -6, color: '#ef4444' }, // 2x + 3y = 6
    { id: 2, a: 1, b: -1, c: 2, color: '#3b82f6' }  // x - y = -2
  ]);
  const [newEquation, setNewEquation] = useState({ a: 1, b: 1, c: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Calculate y value for a given x in the equation ax + by + c = 0
  const calculateY = (x: number, eq: {a: number, b: number, c: number}) => {
    // ax + by + c = 0 → by = -ax - c → y = (-ax - c)/b
    if (eq.b === 0) return null; // Vertical line
    return (-eq.a * x - eq.c) / eq.b;
  };
  
  // Generate points for a line
  const generateLinePoints = (eq: {a: number, b: number, c: number}) => {
    const points = [];
    // For vertical lines (b = 0), we handle separately
    if (eq.b === 0) {
      // ax + c = 0 → x = -c/a
      if (eq.a !== 0) {
        const x = -eq.c / eq.a;
        // Convert to SVG coordinates
        const svgX = (x + 10) * 20;
        points.push({ x: svgX, y: 0 });
        points.push({ x: svgX, y: 400 });
      }
      return points;
    }
    
    // For regular lines
    for (let x = -10; x <= 10; x += 0.5) {
      const y = calculateY(x, eq);
      if (y !== null && y >= -10 && y <= 10) {
        // Scale and translate for SVG coordinates
        const svgX = (x + 10) * 20;
        const svgY = (10 - y) * 20; // Flip Y axis
        points.push({ x: svgX, y: svgY, originalX: x, originalY: y });
      }
    }
    return points;
  };
  
  // Add a new equation
  const addEquation = () => {
    const colors = ['#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];
    const newId = equations.length > 0 ? Math.max(...equations.map(e => e.id)) + 1 : 1;
    const newColor = colors[(newId - 1) % colors.length];
    
    setEquations([
      ...equations,
      { 
        id: newId, 
        a: newEquation.a, 
        b: newEquation.b, 
        c: newEquation.c, 
        color: newColor 
      }
    ]);
    setNewEquation({ a: 1, b: 1, c: 0 });
  };
  
  // Remove an equation
  const removeEquation = (id: number) => {
    setEquations(equations.filter(eq => eq.id !== id));
  };
  
  // Update an equation
  const updateEquation = (id: number, field: string, value: number) => {
    setEquations(equations.map(eq => 
      eq.id === id ? { ...eq, [field]: value } : eq
    ));
  };
  
  // Find intersection point of two lines
  const findIntersection = (eq1: {a: number, b: number, c: number}, eq2: {a: number, b: number, c: number}) => {
    // Solve the system:
    // a1*x + b1*y + c1 = 0
    // a2*x + b2*y + c2 = 0
    
    // Using Cramer's rule:
    // x = (b1*c2 - b2*c1)/(a1*b2 - a2*b1)
    // y = (c1*a2 - c2*a1)/(a1*b2 - a2*b1)
    
    const denominator = eq1.a * eq2.b - eq2.a * eq1.b;
    
    // If denominator is 0, lines are parallel
    if (Math.abs(denominator) < 0.0001) {
      return null;
    }
    
    const x = (eq1.b * eq2.c - eq2.b * eq1.c) / denominator;
    const y = (eq1.c * eq2.a - eq2.c * eq1.a) / denominator;
    
    return { x, y };
  };
  
  // Find all intersection points
  const findIntersections = () => {
    const intersections = [];
    for (let i = 0; i < equations.length; i++) {
      for (let j = i + 1; j < equations.length; j++) {
        const intersection = findIntersection(equations[i], equations[j]);
        if (intersection) {
          intersections.push({
            point: intersection,
            lines: [equations[i].id, equations[j].id]
          });
        }
      }
    }
    return intersections;
  };
  
  const intersections = findIntersections();
  
  // Reset to example
  const resetToExample = () => {
    setEquations([
      { id: 1, a: 2, b: 3, c: -6, color: '#ef4444' }, // 2x + 3y = 6
      { id: 2, a: 1, b: -1, c: 2, color: '#3b82f6' }  // x - y = -2
    ]);
  };
  
  // Convert Cartesian coordinates to SVG coordinates
  const toSvgX = (x: number) => (x + 10) * 20;
  const toSvgY = (y: number) => (10 - y) * 20;
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Linear Equations Graph</h3>
      
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
            
            {/* Lines */}
            {equations.map(eq => {
              const points = generateLinePoints(eq);
              if (points.length === 0) return null;
              
              // For vertical lines
              if (eq.b === 0 && points.length === 2) {
                return (
                  <line
                    key={eq.id}
                    x1={points[0].x}
                    y1={points[0].y}
                    x2={points[1].x}
                    y2={points[1].y}
                    stroke={eq.color}
                    strokeWidth="2"
                  />
                );
              }
              
              // For regular lines
              return (
                <polyline
                  key={eq.id}
                  points={points.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke={eq.color}
                  strokeWidth="2"
                />
              );
            })}
            
            {/* Intersection points */}
            {intersections.map((intersection, index) => (
              <circle
                key={index}
                cx={toSvgX(intersection.point.x)}
                cy={toSvgY(intersection.point.y)}
                r="6"
                fill="#f59e0b"
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>
      
      {/* Equations List */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Equations</h4>
        <div className="space-y-3">
          {equations.map(eq => (
            <div key={eq.id} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: eq.color }}
              ></div>
              <div className="flex-1 grid grid-cols-3 gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={eq.a}
                  onChange={(e) => updateEquation(eq.id, 'a', parseFloat(e.target.value) || 0)}
                  className="px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
                <input
                  type="number"
                  step="0.1"
                  value={eq.b}
                  onChange={(e) => updateEquation(eq.id, 'b', parseFloat(e.target.value) || 0)}
                  className="px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
                <input
                  type="number"
                  step="0.1"
                  value={eq.c}
                  onChange={(e) => updateEquation(eq.id, 'c', parseFloat(e.target.value) || 0)}
                  className="px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="text-sm text-gray-700 dark:text-slate-300">
                {eq.a}x {eq.b >= 0 ? '+' : ''} {eq.b}y {eq.c >= 0 ? '+' : ''} {eq.c} = 0
              </div>
              <button
                onClick={() => removeEquation(eq.id)}
                className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add Equation */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Add New Equation</h4>
        <div className="flex items-end gap-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Coefficient of x</label>
            <input
              type="number"
              step="0.1"
              value={newEquation.a}
              onChange={(e) => setNewEquation({...newEquation, a: parseFloat(e.target.value) || 0})}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Coefficient of y</label>
            <input
              type="number"
              step="0.1"
              value={newEquation.b}
              onChange={(e) => setNewEquation({...newEquation, b: parseFloat(e.target.value) || 0})}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Constant term</label>
            <input
              type="number"
              step="0.1"
              value={newEquation.c}
              onChange={(e) => setNewEquation({...newEquation, c: parseFloat(e.target.value) || 0})}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <button
            onClick={addEquation}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Intersections */}
      {intersections.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Intersection Points</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {intersections.map((intersection, index) => (
              <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <div className="font-semibold">Solution:</div>
                  <div>x = {intersection.point.x.toFixed(2)}, y = {intersection.point.y.toFixed(2)}</div>
                  <div className="text-xs mt-1">
                    Lines {intersection.lines[0]} and {intersection.lines[1]} intersect
                  </div>
                </div>
              </div>
            ))}
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
          <li><strong>2x + 3y = 6</strong> and <strong>x - y = -2</strong> → Solution: (0, 2)</li>
          <li><strong>x + y = 5</strong> and <strong>2x - y = 1</strong> → Solution: (2, 3)</li>
          <li><strong>3x + 2y = 12</strong> and <strong>x + y = 5</strong> → Solution: (2, 3)</li>
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Adjust coefficients to see how lines change and where they intersect.</p>
        <p className="mt-1">Yellow dots represent intersection points (solutions to the system).</p>
      </div>
    </div>
  );
}
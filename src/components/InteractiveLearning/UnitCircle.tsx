import { useState, useEffect, useRef } from 'react';

export function UnitCircle() {
  const [angle, setAngle] = useState(0); // in degrees
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Convert degrees to radians
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  // Draw the unit circle
  const drawUnitCircle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw coordinate axes
    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    
    // Draw unit circle
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw angle arc
    ctx.beginPath();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.arc(centerX, centerY, radius * 0.3, 0, toRadians(angle), angle > 0);
    ctx.stroke();
    
    // Calculate point on circle
    const rad = toRadians(angle);
    const x = centerX + radius * Math.cos(rad);
    const y = centerY - radius * Math.sin(rad);
    
    // Draw radius line
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Draw point on circle
    ctx.beginPath();
    ctx.fillStyle = '#10b981';
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw projections to axes
    ctx.beginPath();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Vertical projection to x-axis
    ctx.moveTo(x, y);
    ctx.lineTo(x, centerY);
    ctx.stroke();
    
    // Horizontal projection to y-axis
    ctx.moveTo(x, y);
    ctx.lineTo(centerX, y);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Draw trigonometric values
    const cosValue = Math.cos(rad);
    const sinValue = Math.sin(rad);
    
    // Cosine on x-axis
    ctx.fillStyle = '#8b5cf6';
    ctx.font = '14px sans-serif';
    ctx.fillText(`cos(${angle}°) = ${cosValue.toFixed(2)}`, x, centerY + 20);
    
    // Sine on y-axis
    ctx.fillText(`sin(${angle}°) = ${sinValue.toFixed(2)}`, centerX - 50, y);
    
    // Draw angle label
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`${angle}°`, centerX + radius * 0.4 * Math.cos(toRadians(angle/2)), centerY - radius * 0.4 * Math.sin(toRadians(angle/2)));
  };

  // Animation loop
  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        setAngle(prev => (prev + 1) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  // Redraw when angle changes
  useEffect(() => {
    drawUnitCircle();
  }, [angle]);

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAngle(parseInt(e.target.value));
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Unit Circle Visualization</h3>
      
      <div className="flex flex-col items-center mb-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-gray-200 dark:border-slate-700 rounded-lg mb-4"
        />
        
        <div className="w-full max-w-md">
          <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400 mb-1">
            <span>0°</span>
            <span>Angle: {angle}°</span>
            <span>360°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={handleAngleChange}
            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <button
          onClick={toggleAnimation}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isAnimating 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isAnimating ? '⏸️ Pause' : '▶️ Animate'}
        </button>
        
        <button
          onClick={() => setShowWave(!showWave)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          {showWave ? 'Hide Waves' : 'Show Waves'}
        </button>
        
        <button
          onClick={() => setAngle(0)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
      
      {showWave && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Trigonometric Waves</h4>
          <div className="h-32 relative border border-gray-200 dark:border-slate-600 rounded">
            {/* This would be a more complex wave visualization in a full implementation */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-slate-400">
              Sine and Cosine waves visualization would appear here
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p className="mb-2"><strong>How to use:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Drag the slider to change the angle and see how sine and cosine values change</li>
          <li>Click "Animate" to see the angle rotate continuously</li>
          <li>Click "Show Waves" to visualize the sine and cosine waves</li>
          <li>The green point shows the current position on the unit circle</li>
          <li>Purple dashed lines show the projections to the x and y axes</li>
        </ul>
      </div>
    </div>
  );
}
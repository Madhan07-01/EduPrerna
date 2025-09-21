import { useState, useEffect } from 'react';

export function BalanceScale() {
  const [leftSide, setLeftSide] = useState({ xCoeff: 1, constant: 5 });
  const [rightSide, setRightSide] = useState({ xCoeff: 0, constant: 8 });
  const [xValue, setXValue] = useState(3);
  const [isBalanced, setIsBalanced] = useState(true);
  
  // Calculate left and right side values
  const leftValue = leftSide.xCoeff * xValue + leftSide.constant;
  const rightValue = rightSide.xCoeff * xValue + rightSide.constant;
  
  // Check if equation is balanced
  useEffect(() => {
    setIsBalanced(leftValue === rightValue);
  }, [leftValue, rightValue, xValue]);
  
  // Handle coefficient changes
  const handleLeftXCoeffChange = (value: number) => {
    setLeftSide(prev => ({ ...prev, xCoeff: value }));
  };
  
  const handleLeftConstantChange = (value: number) => {
    setLeftSide(prev => ({ ...prev, constant: value }));
  };
  
  const handleRightXCoeffChange = (value: number) => {
    setRightSide(prev => ({ ...prev, xCoeff: value }));
  };
  
  const handleRightConstantChange = (value: number) => {
    setRightSide(prev => ({ ...prev, constant: value }));
  };
  
  // Handle x value change
  const handleXChange = (value: number) => {
    setXValue(value);
  };
  
  // Solve the equation
  const solveEquation = () => {
    // ax + b = cx + d
    // (a - c)x = d - b
    // x = (d - b) / (a - c)
    
    const a = leftSide.xCoeff;
    const b = leftSide.constant;
    const c = rightSide.xCoeff;
    const d = rightSide.constant;
    
    if (a - c !== 0) {
      const solution = (d - b) / (a - c);
      setXValue(solution);
    }
  };
  
  // Reset to example equation
  const resetToExample = () => {
    setLeftSide({ xCoeff: 2, constant: 3 });
    setRightSide({ xCoeff: 0, constant: 9 });
    setXValue(3);
  };
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Linear Equation Balance Scale</h3>
      
      {/* Equation Display */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-center text-xl font-bold text-gray-900 dark:text-white">
          {leftSide.xCoeff !== 0 ? (
            <>
              {leftSide.xCoeff !== 1 ? (
                leftSide.xCoeff === -1 ? '-x' : `${leftSide.xCoeff}x`
              ) : 'x'}
              {leftSide.constant > 0 ? ` + ${leftSide.constant}` : leftSide.constant < 0 ? ` - ${Math.abs(leftSide.constant)}` : ''}
            </>
          ) : (
            leftSide.constant
          )}
          <span className="mx-2">=</span>
          {rightSide.xCoeff !== 0 ? (
            <>
              {rightSide.xCoeff !== 1 ? (
                rightSide.xCoeff === -1 ? '-x' : `${rightSide.xCoeff}x`
              ) : 'x'}
              {rightSide.constant > 0 ? ` + ${rightSide.constant}` : rightSide.constant < 0 ? ` - ${Math.abs(rightSide.constant)}` : ''}
            </>
          ) : (
            rightSide.constant
          )}
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-slate-400 mt-2">
          x = {xValue.toFixed(2)}
        </div>
      </div>
      
      {/* Balance Scale Visualization */}
      <div className="mb-6">
        <div className="relative h-32">
          {/* Fulcrum (center) */}
          <div className="absolute left-1/2 top-16 transform -translate-x-1/2 w-4 h-8 bg-gray-600"></div>
          
          {/* Balance beam */}
          <div className={`absolute left-1/4 right-1/4 top-16 h-2 bg-gray-400 dark:bg-slate-600 transition-transform duration-500 ${
            isBalanced ? '' : leftValue > rightValue ? '-rotate-3' : 'rotate-3'
          }`}></div>
          
          {/* Left side */}
          <div className="absolute left-1/4 top-8 transform -translate-x-1/2 w-24 h-16 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-800 dark:text-blue-200">{leftValue.toFixed(1)}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Left</div>
            </div>
          </div>
          
          {/* Right side */}
          <div className="absolute right-1/4 top-8 transform translate-x-1/2 w-24 h-16 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-green-800 dark:text-green-200">{rightValue.toFixed(1)}</div>
              <div className="text-xs text-green-600 dark:text-green-400">Right</div>
            </div>
          </div>
        </div>
        
        {/* Balance status */}
        <div className="text-center mt-4">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            isBalanced 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
          }`}>
            {isBalanced ? '✅ Balanced!' : '不平衡 (Unbalanced)'}
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Left Side</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 dark:text-slate-400 mb-1">x coefficient</label>
              <input
                type="number"
                value={leftSide.xCoeff}
                onChange={(e) => handleLeftXCoeffChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-slate-400 mb-1">Constant</label>
              <input
                type="number"
                value={leftSide.constant}
                onChange={(e) => handleLeftConstantChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Right Side</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 dark:text-slate-400 mb-1">x coefficient</label>
              <input
                type="number"
                value={rightSide.xCoeff}
                onChange={(e) => handleRightXCoeffChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-slate-400 mb-1">Constant</label>
              <input
                type="number"
                value={rightSide.constant}
                onChange={(e) => handleRightConstantChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* X Value Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          Value of x: {xValue.toFixed(2)}
        </label>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={xValue}
          onChange={(e) => handleXChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-600 dark:text-slate-400 mt-1">
          <span>-10</span>
          <span>-5</span>
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <button
          onClick={solveEquation}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Solve Equation
        </button>
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
          <li><strong>2x + 3 = 9</strong> → Solution: x = 3</li>
          <li><strong>5x - 2 = 3x + 4</strong> → Solution: x = 3</li>
          <li><strong>x + 7 = 12</strong> → Solution: x = 5</li>
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Adjust the coefficients and constants on both sides of the equation.</p>
        <p className="mt-1">Move the x slider to find the value that balances the equation.</p>
      </div>
    </div>
  );
}
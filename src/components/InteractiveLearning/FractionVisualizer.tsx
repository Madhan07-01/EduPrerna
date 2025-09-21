import { useState } from 'react';

interface FractionVisualizerProps {
  initialNumerator?: number;
  initialDenominator?: number;
  onFractionChange?: (numerator: number, denominator: number) => void;
}

export function FractionVisualizer({ 
  initialNumerator = 1,
  initialDenominator = 2,
  onFractionChange 
}: FractionVisualizerProps) {
  const [numerator, setNumerator] = useState(initialNumerator);
  const [denominator, setDenominator] = useState(initialDenominator);

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setNumerator(value);
    onFractionChange?.(value, denominator);
  };

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setDenominator(value);
    onFractionChange?.(numerator, value);
  };

  const incrementNumerator = () => {
    const newValue = numerator + 1;
    setNumerator(newValue);
    onFractionChange?.(newValue, denominator);
  };

  const decrementNumerator = () => {
    const newValue = Math.max(0, numerator - 1);
    setNumerator(newValue);
    onFractionChange?.(newValue, denominator);
  };

  const incrementDenominator = () => {
    const newValue = denominator + 1;
    setDenominator(newValue);
    onFractionChange?.(numerator, newValue);
  };

  const decrementDenominator = () => {
    const newValue = Math.max(1, denominator - 1);
    setDenominator(newValue);
    onFractionChange?.(numerator, newValue);
  };

  // Calculate decimal value
  const decimalValue = denominator !== 0 ? numerator / denominator : 0;

  // Generate visual representation
  const renderFractionVisual = () => {
    if (denominator <= 0) return null;

    const parts = [];
    const filledParts = Math.min(numerator, denominator);
    
    for (let i = 0; i < denominator; i++) {
      parts.push(
        <div 
          key={i}
          className={`w-12 h-12 border-2 flex items-center justify-center text-lg font-bold ${
            i < filledParts
              ? 'bg-blue-500 border-blue-600 text-white'
              : 'bg-gray-100 border-gray-300 dark:bg-slate-700 dark:border-slate-600 text-gray-700 dark:text-slate-300'
          }`}
        >
          {i < filledParts ? '✓' : ''}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {parts}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interactive Fraction Visualizer</h3>
      
      <div className="mb-6">
        <div className="text-center text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {numerator}/{denominator}
        </div>
        <div className="text-center text-xl text-gray-600 dark:text-slate-400">
          = {decimalValue.toFixed(2)}
        </div>
      </div>

      {/* Visual Representation */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
        <h4 className="text-md font-semibold text-gray-800 dark:text-slate-200 mb-3">Visual Representation</h4>
        {renderFractionVisual()}
        <p className="text-sm text-gray-600 dark:text-slate-400 mt-3 text-center">
          {numerator} out of {denominator} parts are filled
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Numerator Controls */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Numerator</h4>
          <div className="flex items-center space-x-3">
            <button
              onClick={decrementNumerator}
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={numerator}
              onChange={handleNumeratorChange}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-center bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              min="0"
            />
            <button
              onClick={incrementNumerator}
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Denominator Controls */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Denominator</h4>
          <div className="flex items-center space-x-3">
            <button
              onClick={decrementDenominator}
              className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={denominator}
              onChange={handleDenominatorChange}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-center bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              min="1"
            />
            <button
              onClick={incrementDenominator}
              className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Adjust the numerator and denominator to see how the fraction changes.</p>
        <p className="mt-1">The visual representation shows how many parts are filled out of the total.</p>
      </div>
    </div>
  );
}
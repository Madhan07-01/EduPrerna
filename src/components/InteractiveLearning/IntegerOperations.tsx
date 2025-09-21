import { useState } from 'react';

interface IntegerOperationsProps {
  initialValueA?: number;
  initialValueB?: number;
}

export function IntegerOperations({ 
  initialValueA = 5,
  initialValueB = -3
}: IntegerOperationsProps) {
  const [valueA, setValueA] = useState(initialValueA);
  const [valueB, setValueB] = useState(initialValueB);
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');

  // Calculate result based on operation
  const calculateResult = () => {
    switch (operation) {
      case 'add':
        return valueA + valueB;
      case 'subtract':
        return valueA - valueB;
      case 'multiply':
        return valueA * valueB;
      case 'divide':
        return valueB !== 0 ? valueA / valueB : NaN;
      default:
        return 0;
    }
  };

  const result = calculateResult();
  const isResultValid = !isNaN(result);

  // Get operation symbol
  const getOperationSymbol = () => {
    switch (operation) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '+';
    }
  };

  // Get operation name
  const getOperationName = () => {
    switch (operation) {
      case 'add': return 'Addition';
      case 'subtract': return 'Subtraction';
      case 'multiply': return 'Multiplication';
      case 'divide': return 'Division';
      default: return 'Addition';
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interactive Integer Operations</h3>
      
      <div className="mb-6">
        <div className="text-center text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {valueA} {getOperationSymbol()} {valueB} = {isResultValid ? result : 'Undefined'}
        </div>
        <div className="text-center text-lg text-gray-600 dark:text-slate-400">
          {getOperationName()}
        </div>
      </div>

      {/* Number Line Visualization */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
        <h4 className="text-md font-semibold text-gray-800 dark:text-slate-200 mb-3">Number Line Representation</h4>
        <div className="relative h-16">
          {/* Number Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-slate-600 transform -translate-y-1/2"></div>
          
          {/* Points for visualization */}
          {[-10, -5, 0, 5, 10].map((point) => (
            <div 
              key={point}
              className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${((point + 10) / 20) * 100}%` }}
            >
              <div className="text-xs text-gray-600 dark:text-slate-400">{point}</div>
            </div>
          ))}
          
          {/* Value A */}
          <div 
            className="absolute top-1/2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 shadow transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${((valueA + 10) / 20) * 100}%` }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-600 dark:text-blue-400">
              A({valueA})
            </div>
          </div>
          
          {/* Value B */}
          <div 
            className="absolute top-1/2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 shadow transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${((valueB + 10) / 20) * 100}%` }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-600 dark:text-green-400">
              B({valueB})
            </div>
          </div>
          
          {/* Result */}
          {isResultValid && (
            <div 
              className="absolute top-1/2 w-6 h-6 bg-purple-500 rounded-full border-2 border-white dark:border-slate-800 shadow transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${((result + 10) / 20) * 100}%` }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-600 dark:text-purple-400">
                ={result.toFixed(1)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Value A Controls */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Integer A</h4>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setValueA(valueA - 1)}
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={valueA}
              onChange={(e) => setValueA(parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-center bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
            <button
              onClick={() => setValueA(valueA + 1)}
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Value B Controls */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Integer B</h4>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setValueB(valueB - 1)}
              className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={valueB}
              onChange={(e) => setValueB(parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-center bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
            <button
              onClick={() => setValueB(valueB + 1)}
              className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Operation Selector */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Operation</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(['add', 'subtract', 'multiply', 'divide'] as const).map((op) => (
            <button
              key={op}
              onClick={() => setOperation(op)}
              className={`py-2 px-3 rounded-lg transition-colors ${
                operation === op
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {op === 'add' && '+'}
              {op === 'subtract' && '-'}
              {op === 'multiply' && '×'}
              {op === 'divide' && '÷'}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-slate-400">
        <p>Adjust the integers and select an operation to see how they interact.</p>
        <p className="mt-1">The number line shows the positions of both integers and the result.</p>
      </div>
    </div>
  );
}
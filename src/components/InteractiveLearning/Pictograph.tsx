import { useState } from 'react';

interface PictographProps {
  data?: { category: string; count: number }[];
  symbol?: string;
  symbolValue?: number;
  title?: string;
}

export function Pictograph({ 
  data = [
    { category: 'Apples', count: 15 },
    { category: 'Bananas', count: 10 },
    { category: 'Oranges', count: 8 },
    { category: 'Grapes', count: 12 }
  ],
  symbol = '🍎',
  symbolValue = 5,
  title = 'Fruit Sales'
}: PictographProps) {
  const [symbolCount, setSymbolCount] = useState(symbolValue);
  
  // Calculate how many symbols to show for each category
  const calculateSymbols = (count: number) => {
    const fullSymbols = Math.floor(count / symbolCount);
    const halfSymbol = count % symbolCount !== 0;
    return { fullSymbols, halfSymbol };
  };
  
  const updateSymbolValue = (value: number) => {
    if (value > 0) {
      setSymbolCount(value);
    }
  };
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">{symbol}</span>
          <span className="text-gray-700 dark:text-slate-300">= {symbolCount} units</span>
        </div>
        
        <div className="flex space-x-2">
          <input
            type="number"
            value={symbolCount}
            onChange={(e) => updateSymbolValue(Number(e.target.value))}
            className="w-20 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:bg-slate-800 dark:text-white"
            min="1"
          />
          <button
            onClick={() => updateSymbolValue(symbolCount - 1)}
            disabled={symbolCount <= 1}
            className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded disabled:opacity-50"
          >
            -
          </button>
          <button
            onClick={() => updateSymbolValue(symbolCount + 1)}
            className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => {
          const { fullSymbols, halfSymbol } = calculateSymbols(item.count);
          return (
            <div key={index} className="flex items-center">
              <div className="w-24 text-gray-700 dark:text-slate-300 font-medium">{item.category}:</div>
              <div className="flex flex-wrap">
                {Array.from({ length: fullSymbols }).map((_, i) => (
                  <span key={i} className="text-2xl mx-0.5">{symbol}</span>
                ))}
                {halfSymbol && (
                  <span className="text-2xl mx-0.5 opacity-50">{symbol}</span>
                )}
              </div>
              <div className="ml-2 text-gray-600 dark:text-slate-400">({item.count})</div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-sm text-gray-600 dark:text-slate-400">
        <p>Each {symbol} represents {symbolCount} units.</p>
        <p className="mt-1">Adjust the symbol value to change how many units each symbol represents.</p>
      </div>
    </div>
  );
}
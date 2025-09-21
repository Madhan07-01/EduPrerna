import { useState } from 'react';

interface DecimalParts {
  whole: string;
  decimal: string;
  places: string[];
}

const parseDecimal = (value: number): DecimalParts => {
  const str = value.toString();
  const parts = str.split('.');
  const whole = parts[0] || '0';
  const decimal = parts[1] || '0';
  const places = decimal.split('');
  
  return { whole, decimal, places };
};

export function DecimalPlaceValue() {
  const [value, setValue] = useState(123.456);
  const { whole, decimal, places } = parseDecimal(value);

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Decimal Place Value</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          Enter a decimal number:
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          step="0.001"
        />
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-2">Place Value Breakdown</h4>
        <div className="flex items-center justify-center space-x-2 text-lg">
          <div className="flex flex-col items-center">
            <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold rounded">
              {whole}
            </div>
            <div className="text-xs text-gray-600 dark:text-slate-400 mt-1">Whole</div>
          </div>
          
          <div className="text-gray-600 dark:text-slate-400">.</div>
          
          {places.map((digit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-semibold rounded">
                {digit}
              </div>
              <div className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                {index === 0 ? 'Tenths' : 
                 index === 1 ? 'Hundredths' : 
                 index === 2 ? 'Thousandths' : 
                 `${index + 1}th place`}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-slate-400">
        <p className="mb-2">In the number {value}:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Whole part: {whole}</li>
          <li>Decimal part: {decimal}</li>
          <li>Total decimal places: {places.length}</li>
        </ul>
      </div>
    </div>
  );
}

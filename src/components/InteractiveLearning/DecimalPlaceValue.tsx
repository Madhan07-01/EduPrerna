import { useState } from 'react';

interface DecimalPlaceValueProps {
  initialValue?: number;
}

export function DecimalPlaceValue({ initialValue = 0 }: DecimalPlaceValueProps) {
  const [value, setValue] = useState(initialValue.toString());
  
  // Parse the decimal value into its components
  const parseDecimal = (decimalStr: string) => {
    const num = parseFloat(decimalStr);
    if (isNaN(num)) return { whole: '0', decimal: '', places: [] };
    
    const parts = decimalStr.split('.');
    const whole = parts[0] || '0';
    const decimal = parts[1] || '';
    
    // Create place value labels
    const places = [];
    if (whole !== '0' && whole !== '') {
      for (let i = 0; i < whole.length; i++) {
        const position = whole.length - i - 1;
        let placeName = '';
        switch (position) {
          case 0: placeName = 'Ones'; break;
          case 1: placeName = 'Tens'; break;
          case 2: placeName = 'Hundreds'; break;
          case 3: placeName = 'Thousands'; break;
          default: placeName = `${Math.pow(10, position).toLocaleString()}`;
        }
        places.push({
          digit: whole[i],
          place: placeName,
          position: position,
          type: 'whole'
        });
      }
    }
    
    if (decimal) {
      for (let i = 0; i < decimal.length; i++) {
        let placeName = '';
        switch (i) {
          case 0: placeName = 'Tenths'; break;
          case 1: placeName = 'Hundredths'; break;
          case 2: placeName = 'Thousandths'; break;
          default: placeName = `10^${-(i+1)}`;
        }
        places.push({
          digit: decimal[i],
          place: placeName,
          position: -(i+1),
          type: 'decimal'
        });
      }
    }
    
    return { whole, decimal, places };
  };

  const { whole, decimal, places } = parseDecimal(value);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Validate that it's a valid decimal number
    if (/^\d*\.?\d*$/.test(newValue) || newValue === '') {
      setValue(newValue);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Decimal Place Value Grid</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          Enter a decimal number:
        </label>
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          placeholder="e.g., 123.456"
        />
      </div>

      <div className="mb-6">
        <div className="text-center text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {value || '0'}
        </div>
        <div className="text-center text-lg text-gray-600 dark:text-slate-400">
          Decimal Number
        </div>
      </div>

      {/* Place Value Grid */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {places.map((place, index) => (
                <th 
                  key={index} 
                  className="border border-gray-300 dark:border-slate-600 p-2 bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-slate-200 font-semibold"
                >
                  {place.place}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {places.map((place, index) => (
                <td 
                  key={index} 
                  className="border border-gray-300 dark:border-slate-600 p-2 text-center text-2xl font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800"
                >
                  {place.digit}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Examples */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Examples:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-slate-400">
          <li><strong>123.45</strong> = 1 hundred + 2 tens + 3 ones + 4 tenths + 5 hundredths</li>
          <li><strong>0.7</strong> = 7 tenths</li>
          <li><strong>5.06</strong> = 5 ones + 0 tenths + 6 hundredths</li>
        </ul>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Enter a decimal number to see its place value breakdown.</p>
        <p className="mt-1">Each digit's position determines its value in the number.</p>
      </div>
    </div>
  );
}
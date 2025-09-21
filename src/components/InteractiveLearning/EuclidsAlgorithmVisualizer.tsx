import { useState } from 'react';

export function EuclidsAlgorithmVisualizer() {
  const [a, setA] = useState(65);
  const [b, setB] = useState(12);
  const [steps, setSteps] = useState<any[]>([]);
  const [hcf, setHcf] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  // Function to perform Euclid's algorithm and record steps
  const calculateHCF = (num1: number, num2: number) => {
    const stepsArray = [];
    let a = num1;
    let b = num2;
    
    while (b !== 0) {
      const quotient = Math.floor(a / b);
      const remainder = a % b;
      stepsArray.push({
        dividend: a,
        divisor: b,
        quotient: quotient,
        remainder: remainder
      });
      a = b;
      b = remainder;
    }
    
    setSteps(stepsArray);
    setHcf(a);
    setShowSteps(true);
  };

  const handleCalculate = () => {
    if (a > 0 && b > 0) {
      calculateHCF(a, b);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Euclid's Algorithm Visualizer</h3>
      
      {/* Input */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            First Number (a)
          </label>
          <input
            type="number"
            min="1"
            value={a}
            onChange={(e) => setA(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Second Number (b)
          </label>
          <input
            type="number"
            min="1"
            value={b}
            onChange={(e) => setB(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      
      <button
        onClick={handleCalculate}
        className="w-full mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Calculate HCF using Euclid's Algorithm
      </button>
      
      {/* Result */}
      {hcf > 0 && (
        <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-center text-lg font-bold text-green-800 dark:text-green-200">
            HCF of {a} and {b} = {hcf}
          </div>
        </div>
      )}
      
      {/* Steps */}
      {showSteps && steps.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Algorithm Steps</h4>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div className="text-gray-700 dark:text-slate-300">
                  Step {index + 1}:
                </div>
                <div className="font-mono text-gray-900 dark:text-white">
                  {step.dividend} = {step.divisor} × {step.quotient} + {step.remainder}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-gray-700 dark:text-slate-300">
                Final Step:
              </div>
              <div className="font-mono font-bold text-blue-800 dark:text-blue-200">
                HCF = {hcf}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Examples */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Examples:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-slate-400">
          <li><strong>HCF(65, 12) = 1</strong> → 65 = 12×5 + 5, 12 = 5×2 + 2, 5 = 2×2 + 1, 2 = 1×2 + 0</li>
          <li><strong>HCF(84, 120) = 12</strong> → 120 = 84×1 + 36, 84 = 36×2 + 12, 36 = 12×3 + 0</li>
          <li><strong>HCF(72, 120) = 24</strong> → 120 = 72×1 + 48, 72 = 48×1 + 24, 48 = 24×2 + 0</li>
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Enter two positive integers to visualize Euclid's algorithm for finding their HCF.</p>
        <p className="mt-1">The algorithm repeatedly applies the division lemma until the remainder becomes zero.</p>
      </div>
    </div>
  );
}
import { useState } from 'react';

export function PrimeFactorizationTree() {
  const [number, setNumber] = useState(60);
  const [factorization, setFactorization] = useState<any[]>([]);
  const [showTree, setShowTree] = useState(false);

  // Function to check if a number is prime
  const isPrime = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  // Function to find the smallest prime factor
  const smallestPrimeFactor = (n: number): number => {
    if (n <= 1) return n;
    if (n % 2 === 0) return 2;
    if (n % 3 === 0) return 3;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0) return i;
      if (n % (i + 2) === 0) return i + 2;
    }
    return n;
  };

  // Function to generate prime factorization tree
  const generateFactorizationTree = (n: number): any[] => {
    if (n <= 1) return [];
    if (isPrime(n)) return [{ value: n, isPrime: true, children: [] }];
    
    const factor = smallestPrimeFactor(n);
    const quotient = n / factor;
    
    return [
      {
        value: n,
        isPrime: false,
        factor: factor,
        quotient: quotient,
        children: [
          { value: factor, isPrime: isPrime(factor), children: [] },
          ...generateFactorizationTree(quotient)
        ]
      }
    ];
  };

  // Function to render the factorization tree
  const renderTree = (nodes: any[], level = 0) => {
    return nodes.map((node, index) => (
      <div key={index} className="flex flex-col items-center">
        {/* Node */}
        <div className={`rounded-full w-12 h-12 flex items-center justify-center font-bold ${
          node.isPrime 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          {node.value}
        </div>
        
        {/* Factor and quotient for non-prime nodes */}
        {!node.isPrime && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            = {node.factor} × {node.quotient}
          </div>
        )}
        
        {/* Children */}
        {node.children && node.children.length > 0 && (
          <div className="mt-4 flex">
            <div className="border-t-2 border-gray-400 w-8 mt-3"></div>
            {renderTree(node.children, level + 1)}
            <div className="border-t-2 border-gray-400 w-8 mt-3"></div>
          </div>
        )}
      </div>
    ));
  };

  const handleGenerate = () => {
    const tree = generateFactorizationTree(number);
    setFactorization(tree);
    setShowTree(true);
  };

  // Calculate prime factorization for display
  const calculatePrimeFactors = (n: number): number[] => {
    const factors: number[] = [];
    let num = n;
    
    while (num > 1) {
      const factor = smallestPrimeFactor(num);
      factors.push(factor);
      num = num / factor;
    }
    
    return factors;
  };

  const primeFactors = calculatePrimeFactors(number);

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Prime Factorization Tree</h3>
      
      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          Enter a number to factorize:
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="2"
            max="1000"
            value={number}
            onChange={(e) => setNumber(Math.max(2, Math.min(1000, parseInt(e.target.value) || 2)))}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Generate
          </button>
        </div>
      </div>
      
      {/* Prime factorization result */}
      {primeFactors.length > 0 && (
        <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Prime Factorization:</span> {number} = {primeFactors.join(' × ')}
          </div>
        </div>
      )}
      
      {/* Factorization tree */}
      {showTree && factorization.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Factorization Tree</h4>
          <div className="flex justify-center overflow-x-auto py-4">
            <div className="flex">
              {renderTree(factorization)}
            </div>
          </div>
        </div>
      )}
      
      {/* Examples */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Examples:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-slate-400">
          <li><strong>60 = 2² × 3 × 5</strong> → Prime factors: 2, 2, 3, 5</li>
          <li><strong>84 = 2² × 3 × 7</strong> → Prime factors: 2, 2, 3, 7</li>
          <li><strong>120 = 2³ × 3 × 5</strong> → Prime factors: 2, 2, 2, 3, 5</li>
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Enter a number to see its prime factorization tree.</p>
        <p className="mt-1">Green nodes represent prime numbers, blue nodes represent composite numbers.</p>
      </div>
    </div>
  );
}
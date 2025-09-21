import { useState } from 'react';

export function CoinToss() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [flipCount, setFlipCount] = useState(0);
  const [resultsHistory, setResultsHistory] = useState<('heads' | 'tails')[]>([]);
  
  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);
    
    // Simulate coin flip animation
    const flipDuration = 1000; // 1 second
    const flipInterval = 50; // Update every 50ms
    const flips = flipDuration / flipInterval;
    
    let currentFlip = 0;
    const flipIntervalId = setInterval(() => {
      // Randomly show heads or tails during animation
      setResult(Math.random() > 0.5 ? 'heads' : 'tails');
      currentFlip++;
      
      if (currentFlip >= flips) {
        clearInterval(flipIntervalId);
        // Final result
        const finalResult = Math.random() > 0.5 ? 'heads' : 'tails';
        setResult(finalResult);
        setIsFlipping(false);
        setFlipCount(prev => prev + 1);
        setResultsHistory(prev => [...prev, finalResult].slice(-10) as ('heads' | 'tails')[]); // Keep last 10 results
      }
    }, flipInterval);
  };
  
  const reset = () => {
    setFlipCount(0);
    setResultsHistory([]);
    setResult(null);
  };
  
  // Calculate statistics
  const headsCount = resultsHistory.filter(r => r === 'heads').length;
  const tailsCount = resultsHistory.filter(r => r === 'tails').length;
  const headsPercentage = resultsHistory.length > 0 ? Math.round((headsCount / resultsHistory.length) * 100) : 0;
  const tailsPercentage = resultsHistory.length > 0 ? Math.round((tailsCount / resultsHistory.length) * 100) : 0;
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Coin Toss Simulator</h3>
      
      <div className="flex flex-col items-center mb-6">
        <div 
          className={`relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 shadow-lg mb-6 cursor-pointer transition-transform ${
            isFlipping ? 'animate-spin' : ''
          }`}
          onClick={flipCoin}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-yellow-400 dark:bg-yellow-500">
            {result === 'heads' ? (
              <span className="text-4xl font-bold text-yellow-800">H</span>
            ) : result === 'tails' ? (
              <span className="text-4xl font-bold text-yellow-800">T</span>
            ) : (
              <span className="text-4xl font-bold text-yellow-800">?</span>
            )}
          </div>
        </div>
        
        <button
          onClick={flipCoin}
          disabled={isFlipping}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isFlipping 
              ? 'bg-gray-300 text-gray-500 dark:bg-slate-700 dark:text-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isFlipping ? 'Flipping...' : 'Flip Coin'}
        </button>
      </div>
      
      {resultsHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Results:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{headsCount}</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Heads ({headsPercentage}%)</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{tailsCount}</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Tails ({tailsPercentage}%)</div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="text-sm text-gray-600 dark:text-slate-400">
              Total flips: {flipCount}
            </div>
          </div>
        </div>
      )}
      
      {resultsHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Last 10 Results:</h4>
          <div className="flex flex-wrap gap-2">
            {resultsHistory.map((res, index) => (
              <span 
                key={index} 
                className={`px-2 py-1 rounded text-sm font-medium ${
                  res === 'heads' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}
              >
                {res === 'heads' ? 'H' : 'T'}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Click the coin or the "Flip Coin" button to toss the coin.</p>
        <p className="mt-1">Theoretical probability of heads or tails is 50% each.</p>
      </div>
    </div>
  );
}
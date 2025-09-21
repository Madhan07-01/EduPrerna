import { useState } from 'react';

export function DiceRoll() {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rollCount, setRollCount] = useState(0);
  const [resultsHistory, setResultsHistory] = useState<number[]>([]);
  const [frequency, setFrequency] = useState([0, 0, 0, 0, 0, 0]); // For dice faces 1-6
  
  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setResult(null);
    
    // Simulate dice roll animation
    const rollDuration = 800; // 0.8 seconds
    const rollInterval = 50; // Update every 50ms
    const rolls = rollDuration / rollInterval;
    
    let currentRoll = 0;
    const rollIntervalId = setInterval(() => {
      // Randomly show a number during animation
      setResult(Math.floor(Math.random() * 6) + 1);
      currentRoll++;
      
      if (currentRoll >= rolls) {
        clearInterval(rollIntervalId);
        // Final result
        const finalResult = Math.floor(Math.random() * 6) + 1;
        setResult(finalResult);
        setIsRolling(false);
        setRollCount(prev => prev + 1);
        
        // Update results history
        const newHistory = [...resultsHistory, finalResult].slice(-20); // Keep last 20 results
        setResultsHistory(newHistory);
        
        // Update frequency
        const newFrequency = [...frequency];
        newFrequency[finalResult - 1]++;
        setFrequency(newFrequency);
      }
    }, rollInterval);
  };
  
  const reset = () => {
    setRollCount(0);
    setResultsHistory([]);
    setFrequency([0, 0, 0, 0, 0, 0]);
    setResult(null);
  };
  
  // Calculate statistics
  const theoreticalProbability = 16.67; // 1/6 ≈ 16.67%
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dice Roll Simulator</h3>
      
      <div className="flex flex-col items-center mb-6">
        <div 
          className={`relative w-24 h-24 rounded-lg bg-white border-2 border-gray-300 dark:border-slate-600 shadow-lg mb-6 flex items-center justify-center cursor-pointer transition-transform ${
            isRolling ? 'animate-bounce' : ''
          }`}
          onClick={rollDice}
        >
          {result ? (
            <div className="grid grid-cols-3 grid-rows-3 gap-1 w-16 h-16">
              {/* Render dice dots based on result */}
              {result === 1 && (
                <>
                  <div></div><div></div><div></div>
                  <div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div>
                  <div></div><div></div><div></div>
                </>
              )}
              {result === 2 && (
                <>
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div><div></div>
                  <div></div><div></div><div></div>
                  <div></div><div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                </>
              )}
              {result === 3 && (
                <>
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div><div></div>
                  <div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div>
                  <div></div><div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                </>
              )}
              {result === 4 && (
                <>
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <div></div><div></div><div></div>
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                </>
              )}
              {result === 5 && (
                <>
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div>
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                </>
              )}
              {result === 6 && (
                <>
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div><div></div><div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                </>
              )}
            </div>
          ) : (
            <div className="text-2xl text-gray-400">?</div>
          )}
        </div>
        
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isRolling 
              ? 'bg-gray-300 text-gray-500 dark:bg-slate-700 dark:text-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>
      
      {resultsHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Frequency Distribution:</h4>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((face) => {
              const count = frequency[face - 1];
              const percentage = rollCount > 0 ? Math.round((count / rollCount) * 100) : 0;
              return (
                <div key={face} className="flex items-center">
                  <div className="w-8 text-gray-700 dark:text-slate-300 font-medium">🎲{face}:</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4">
                      <div 
                        className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm text-gray-600 dark:text-slate-400">
                    {count} ({percentage}%)
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-3 text-sm text-gray-600 dark:text-slate-400">
            Theoretical probability for each face: {theoreticalProbability}%
          </div>
        </div>
      )}
      
      {resultsHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Last 20 Rolls:</h4>
          <div className="flex flex-wrap gap-2">
            {resultsHistory.map((res, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded"
              >
                {res}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {rollCount > 0 && (
        <div className="mb-4 text-center text-gray-600 dark:text-slate-400">
          Total rolls: {rollCount}
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
        <p>Click the dice or the "Roll Dice" button to roll the dice.</p>
        <p className="mt-1">Each face (1-6) has an equal theoretical probability of 1/6 (≈16.67%).</p>
      </div>
    </div>
  );
}
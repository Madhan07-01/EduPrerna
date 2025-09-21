import { useState } from 'react';

export function VennDiagram() {
  const [sets] = useState({
    A: ['1', '2', '3', '4'],
    B: ['3', '4', '5', '6'],
    universal: ['1', '2', '3', '4', '5', '6', '7', '8']
  });
  
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [placedItems, setPlacedItems] = useState<Record<string, 'A' | 'B' | 'intersection' | 'outside'>>({});

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (region: 'A' | 'B' | 'intersection' | 'outside', e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem) return;
    
    setPlacedItems(prev => ({
      ...prev,
      [draggedItem]: region
    }));
    
    setDraggedItem(null);
  };

  const getItemsInRegion = (region: 'A' | 'B' | 'intersection' | 'outside') => {
    return Object.entries(placedItems)
      .filter(([_, itemRegion]) => itemRegion === region)
      .map(([item, _]) => item);
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Venn Diagram Activity</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">
          Drag numbers to the correct regions of the Venn diagram:
        </p>
        <div className="flex flex-wrap gap-2">
          {sets.universal.map(item => (
            !placedItems[item] && (
              <div
                key={item}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full cursor-move"
              >
                {item}
              </div>
            )
          ))}
        </div>
      </div>
      
      <div 
        className="relative h-64 bg-gray-50 dark:bg-slate-700 rounded-lg overflow-hidden"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop('outside', e)}
      >
        {/* Universal set boundary */}
        <div className="absolute inset-4 border-2 border-gray-400 dark:border-slate-500 rounded-lg"></div>
        
        {/* Set A circle */}
        <div 
          className="absolute top-8 left-8 w-40 h-40 border-2 border-blue-500 rounded-full flex items-center justify-center"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop('A', e)}
        >
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Set A
          </span>
          {/* Items in Set A only */}
          <div className="absolute flex flex-wrap justify-center gap-1" style={{ width: '100%', top: '60%' }}>
            {getItemsInRegion('A').map(item => (
              <div 
                key={item} 
                className="w-6 h-6 flex items-center justify-center bg-blue-200 text-blue-800 rounded-full text-xs"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        
        {/* Set B circle */}
        <div 
          className="absolute top-8 right-8 w-40 h-40 border-2 border-green-500 rounded-full flex items-center justify-center"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop('B', e)}
        >
          <span className="absolute -top-6 right-1/2 transform translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Set B
          </span>
          {/* Items in Set B only */}
          <div className="absolute flex flex-wrap justify-center gap-1" style={{ width: '100%', top: '60%' }}>
            {getItemsInRegion('B').map(item => (
              <div 
                key={item} 
                className="w-6 h-6 flex items-center justify-center bg-green-200 text-green-800 rounded-full text-xs"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        
        {/* Intersection area */}
        <div 
          className="absolute top-24 left-1/2 transform -translate-x-1/2 w-20 h-20"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop('intersection', e)}
        >
          {/* Items in intersection */}
          <div className="absolute flex flex-wrap justify-center gap-1" style={{ width: '100%', top: '50%' }}>
            {getItemsInRegion('intersection').map(item => (
              <div 
                key={item} 
                className="w-6 h-6 flex items-center justify-center bg-purple-200 text-purple-800 rounded-full text-xs"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        
        {/* Items outside both circles */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-1">
          {getItemsInRegion('outside').map(item => (
            <div 
              key={item} 
              className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full text-xs"
            >
              {item}
            </div>
          ))}
        </div>
        
        {/* Intersection label */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-xs text-purple-600 dark:text-purple-400 font-semibold">
          A ∩ B
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>Drag numbers to the appropriate regions:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Numbers that belong only to Set A go in the left circle</li>
          <li>Numbers that belong only to Set B go in the right circle</li>
          <li>Numbers that belong to both sets go in the overlapping region</li>
          <li>Numbers that belong to neither set go outside both circles</li>
        </ul>
      </div>
    </div>
  );
}
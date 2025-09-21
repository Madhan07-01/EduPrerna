import { useState } from 'react';

export function RelationGraphBuilder() {
  const [domain] = useState(['1', '2', '3']);
  const [codomain] = useState(['a', 'b', 'c']);
  const [relations, setRelations] = useState<Array<[string, string]>>([
    ['1', 'a'],
    ['2', 'b'],
    ['3', 'c']
  ]);
  
  const [newRelation, setNewRelation] = useState<[string, string]>(['1', 'a']);
  const [functionType, setFunctionType] = useState<'oneToOne' | 'onto' | 'bijective' | 'none'>('bijective');

  const handleAddRelation = () => {
    // Check if relation already exists
    const relationExists = relations.some(
      rel => rel[0] === newRelation[0] && rel[1] === newRelation[1]
    );
    
    if (!relationExists) {
      const updatedRelations = [...relations, newRelation];
      setRelations(updatedRelations);
      checkFunctionType(updatedRelations);
    }
  };

  const handleRemoveRelation = (index: number) => {
    const newRelations = relations.filter((_, i) => i !== index);
    setRelations(newRelations);
    checkFunctionType(newRelations);
  };

  const checkFunctionType = (currentRelations: Array<[string, string]>) => {
    // Check if it's a function (each domain element maps to at most one codomain element)
    const domainMap = new Map<string, string[]>();
    currentRelations.forEach(([d, c]) => {
      if (!domainMap.has(d)) domainMap.set(d, []);
      domainMap.get(d)?.push(c);
    });

    // Check if it's a valid function
    const isFunction = Array.from(domainMap.values()).every(codes => codes.length <= 1);
    if (!isFunction) {
      setFunctionType('none');
      return;
    }

    // Check if it's one-to-one (injective)
    const codomainMap = new Map<string, string[]>();
    currentRelations.forEach(([d, c]) => {
      if (!codomainMap.has(c)) codomainMap.set(c, []);
      codomainMap.get(c)?.push(d);
    });
    
    const isOneToOne = Array.from(codomainMap.values()).every(domains => domains.length <= 1);
    
    // Check if it's onto (surjective)
    const codomainUsed = new Set(currentRelations.map(([_, c]) => c));
    const isOnto = codomain.every(c => codomainUsed.has(c));
    
    if (isOneToOne && isOnto) {
      setFunctionType('bijective');
    } else if (isOneToOne) {
      setFunctionType('oneToOne');
    } else if (isOnto) {
      setFunctionType('onto');
    } else {
      setFunctionType('none');
    }
  };

  // Calculate positions for elements
  const getElementPosition = (type: 'domain' | 'codomain', index: number) => {
    const top = 50 + index * 60; // 50px top padding, 60px spacing
    const left = type === 'domain' ? 50 : 350; // 50px for domain, 350px for codomain
    return { top, left };
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Relation Graph Builder</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Domain */}
        <div>
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-2">Domain</h4>
          <div className="flex flex-wrap gap-2">
            {domain.map((item, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        
        {/* Codomain */}
        <div>
          <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-2">Codomain</h4>
          <div className="flex flex-wrap gap-2">
            {codomain.map((item, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Relation Builder */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-2">Create Relations</h4>
        <div className="flex gap-2 items-center">
          <select
            value={newRelation[0]}
            onChange={(e) => setNewRelation([e.target.value, newRelation[1]])}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          >
            {domain.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          
          <span className="text-gray-600 dark:text-slate-400">→</span>
          
          <select
            value={newRelation[1]}
            onChange={(e) => setNewRelation([newRelation[0], e.target.value])}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          >
            {codomain.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          
          <button
            onClick={handleAddRelation}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Visualization */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-3">Relation Visualization</h4>
        
        <div className="relative h-64">
          {/* SVG for arrows */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {relations.map(([domainEl, codomainEl], index) => {
              const domainIndex = domain.indexOf(domainEl);
              const codomainIndex = codomain.indexOf(codomainEl);
              
              if (domainIndex === -1 || codomainIndex === -1) return null;
              
              return (
                <line
                  key={index}
                  x1={getElementPosition('domain', domainIndex).left + 20}
                  y1={getElementPosition('domain', domainIndex).top + 20}
                  x2={getElementPosition('codomain', codomainIndex).left + 20}
                  y2={getElementPosition('codomain', codomainIndex).top + 20}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#3b82f6"
                />
              </marker>
            </defs>
          </svg>
          
          {/* Domain elements */}
          <div className="absolute" style={{ zIndex: 2 }}>
            {domain.map((item, index) => {
              const pos = getElementPosition('domain', index);
              return (
                <div
                  key={`domain-${index}`}
                  className="absolute w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full"
                  style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
                >
                  {item}
                </div>
              );
            })}
          </div>
          
          {/* Codomain elements */}
          <div className="absolute" style={{ zIndex: 2 }}>
            {codomain.map((item, index) => {
              const pos = getElementPosition('codomain', index);
              return (
                <div
                  key={`codomain-${index}`}
                  className="absolute w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full"
                  style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
                >
                  {item}
                </div>
              );
            })}
          </div>
          
          {/* Labels */}
          <div className="absolute top-2 left-12 font-medium text-gray-700 dark:text-slate-300">Domain</div>
          <div className="absolute top-2 left-96 font-medium text-gray-700 dark:text-slate-300">Codomain</div>
        </div>
      </div>
      
      {/* Relations List */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-slate-200 mb-2">Current Relations</h4>
        <div className="space-y-2">
          {relations.map((relation, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-slate-700 rounded">
              <span>{relation[0]} → {relation[1]}</span>
              <button
                onClick={() => handleRemoveRelation(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Function Type */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Function Type</h4>
        <div className="text-blue-700 dark:text-blue-300">
          {functionType === 'oneToOne' && 'One-to-One (Injective) Function'}
          {functionType === 'onto' && 'Onto (Surjective) Function'}
          {functionType === 'bijective' && 'Bijective Function (One-to-One and Onto)'}
          {functionType === 'none' && 'Not a Function'}
        </div>
      </div>
    </div>
  );
}
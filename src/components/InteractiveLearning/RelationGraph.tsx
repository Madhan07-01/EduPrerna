import { useState } from 'react';

export function RelationGraph() {
  const [domain] = useState(['1', '2', '3']);
  const [codomain] = useState(['a', 'b', 'c']);
  const [relations] = useState([
    ['1', 'a'],
    ['2', 'b'],
    ['3', 'c']
  ]);

  // Calculate positions for elements
  const getElementPosition = (type: 'domain' | 'codomain', index: number) => {
    const top = 50 + index * 60; // 50px top padding, 60px spacing
    const left = type === 'domain' ? 50 : 350; // 50px for domain, 350px for codomain
    return { top, left };
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Relation Graph</h3>
      
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
      
      <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
        <p>This visualization shows a relation between two sets:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {relations.map(([d, c], index) => (
            <li key={index}>{d} → {c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

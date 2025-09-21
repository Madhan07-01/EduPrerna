import React, { useState, useEffect } from 'react';

type Matrix = number[][];

const MatrixPlayground: React.FC = () => {
  const [matrixA, setMatrixA] = useState<Matrix>([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[2, 0], [1, 3]]);
  const [resultMatrix, setResultMatrix] = useState<Matrix | null>(null);
  const [operation, setOperation] = useState<string>('multiply');
  const [rowsA, setRowsA] = useState<number>(2);
  const [colsA, setColsA] = useState<number>(2);
  const [rowsB, setRowsB] = useState<number>(2);
  const [colsB, setColsB] = useState<number>(2);

  // Initialize matrices when dimensions change
  useEffect(() => {
    const newMatrixA: Matrix = [];
    for (let i = 0; i < rowsA; i++) {
      const row: number[] = [];
      for (let j = 0; j < colsA; j++) {
        row.push(matrixA[i]?.[j] !== undefined ? matrixA[i][j] : 0);
      }
      newMatrixA.push(row);
    }
    setMatrixA(newMatrixA);
  }, [rowsA, colsA]);

  useEffect(() => {
    const newMatrixB: Matrix = [];
    for (let i = 0; i < rowsB; i++) {
      const row: number[] = [];
      for (let j = 0; j < colsB; j++) {
        row.push(matrixB[i]?.[j] !== undefined ? matrixB[i][j] : 0);
      }
      newMatrixB.push(row);
    }
    setMatrixB(newMatrixB);
  }, [rowsB, colsB]);

  // Perform matrix operation
  useEffect(() => {
    if (operation === 'multiply') {
      // Check if multiplication is possible
      if (colsA === rowsB) {
        const result: Matrix = [];
        for (let i = 0; i < rowsA; i++) {
          const row: number[] = [];
          for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
              sum += (matrixA[i]?.[k] || 0) * (matrixB[k]?.[j] || 0);
            }
            row.push(sum);
          }
          result.push(row);
        }
        setResultMatrix(result);
      } else {
        setResultMatrix(null);
      }
    } else if (operation === 'add') {
      // Check if addition is possible
      if (rowsA === rowsB && colsA === colsB) {
        const result: Matrix = [];
        for (let i = 0; i < rowsA; i++) {
          const row: number[] = [];
          for (let j = 0; j < colsA; j++) {
            row.push((matrixA[i]?.[j] || 0) + (matrixB[i]?.[j] || 0));
          }
          result.push(row);
        }
        setResultMatrix(result);
      } else {
        setResultMatrix(null);
      }
    } else if (operation === 'subtract') {
      // Check if subtraction is possible
      if (rowsA === rowsB && colsA === colsB) {
        const result: Matrix = [];
        for (let i = 0; i < rowsA; i++) {
          const row: number[] = [];
          for (let j = 0; j < colsA; j++) {
            row.push((matrixA[i]?.[j] || 0) - (matrixB[i]?.[j] || 0));
          }
          result.push(row);
        }
        setResultMatrix(result);
      } else {
        setResultMatrix(null);
      }
    }
  }, [matrixA, matrixB, operation, rowsA, colsA, rowsB, colsB]);

  const handleMatrixChange = (
    matrix: Matrix,
    setMatrix: React.Dispatch<React.SetStateAction<Matrix>>,
    row: number,
    col: number,
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    const newMatrix = [...matrix];
    if (newMatrix[row]) {
      newMatrix[row] = [...newMatrix[row]];
      newMatrix[row][col] = numValue;
      setMatrix(newMatrix);
    }
  };

  const renderMatrix = (
    matrix: Matrix,
    setMatrix: React.Dispatch<React.SetStateAction<Matrix>>,
    title: string,
    rows: number,
    cols: number
  ) => {
    return (
      <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
        <h4 className="font-bold text-gray-700 mb-2">{title}</h4>
        <div className="inline-block border-2 border-gray-400 p-2 rounded">
          {matrix.map((row, i) => (
            <div key={i} className="flex">
              {row.map((cell, j) => (
                <input
                  key={j}
                  type="number"
                  value={cell}
                  onChange={(e) => handleMatrixChange(matrix, setMatrix, i, j, e.target.value)}
                  className="w-12 h-12 text-center border border-gray-300 mx-1 rounded"
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {rows} × {cols}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!resultMatrix) {
      return (
        <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50 text-center">
          <p className="text-red-700 font-bold">
            {operation === 'multiply' 
              ? 'Matrix multiplication not possible! Columns of A must equal rows of B.' 
              : 'Matrices must have the same dimensions for this operation.'}
          </p>
        </div>
      );
    }

    return (
      <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
        <h4 className="font-bold text-green-700 mb-2">Result</h4>
        <div className="inline-block border-2 border-green-400 p-2 rounded">
          {resultMatrix.map((row, i) => (
            <div key={i} className="flex">
              {row.map((cell, j) => (
                <div
                  key={j}
                  className="w-12 h-12 text-center border border-green-300 mx-1 rounded flex items-center justify-center font-bold"
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-green-600">
          {resultMatrix.length} × {resultMatrix[0]?.length || 0}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-teal-100 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-green-800 mb-4">Matrix Playground</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matrix A */}
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 mr-2">
              Rows:
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rowsA}
              onChange={(e) => setRowsA(parseInt(e.target.value) || 1)}
              className="w-16 p-1 border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700 mx-2">
              Cols:
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={colsA}
              onChange={(e) => setColsA(parseInt(e.target.value) || 1)}
              className="w-16 p-1 border border-gray-300 rounded"
            />
          </div>
          {renderMatrix(matrixA, setMatrixA, "Matrix A", rowsA, colsA)}
        </div>
        
        {/* Operation Selector */}
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="multiply">A × B (Multiply)</option>
              <option value="add">A + B (Add)</option>
              <option value="subtract">A - B (Subtract)</option>
            </select>
          </div>
          
          <div className="text-4xl font-bold text-gray-700 my-4">
            {operation === 'multiply' ? '×' : operation === 'add' ? '+' : '-'}
          </div>
          
          <div className="text-sm text-gray-600 text-center">
            <p className="mb-1">Drag numbers to matrix cells</p>
            <div 
              className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-move"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "5");
              }}
            >
              5
            </div>
          </div>
        </div>
        
        {/* Matrix B */}
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 mr-2">
              Rows:
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rowsB}
              onChange={(e) => setRowsB(parseInt(e.target.value) || 1)}
              className="w-16 p-1 border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700 mx-2">
              Cols:
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={colsB}
              onChange={(e) => setColsB(parseInt(e.target.value) || 1)}
              className="w-16 p-1 border border-gray-300 rounded"
            />
          </div>
          {renderMatrix(matrixB, setMatrixB, "Matrix B", rowsB, colsB)}
        </div>
      </div>
      
      {/* Result */}
      <div className="mt-6">
        {renderResult()}
      </div>
      
      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600">
        <p className="font-bold mb-2">How to use:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Change matrix dimensions using the row/column controls</li>
          <li>Edit matrix values by clicking on cells</li>
          <li>Drag the number (5) to any matrix cell to set its value</li>
          <li>Select an operation to see the result</li>
          <li>For multiplication: Columns of A must equal rows of B</li>
          <li>For addition/subtraction: Matrices must have the same dimensions</li>
        </ul>
      </div>
    </div>
  );
};

export default MatrixPlayground;
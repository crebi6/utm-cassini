import React, { useState } from 'react';
import { CoordinateForm } from './components/CoordinateForm';
import { Map } from './components/Map';
import { ResultDisplay } from './components/ResultDisplay';
import { TransformationResult } from './types/coordinates';
import { transformCoordinates } from './utils/coordinateTransform';

function App() {
  const [result, setResult] = useState<TransformationResult>();
  const [error, setError] = useState<string>();

  const handleTransform = (data: any) => {
    try {
      setError(undefined);
      const transformed = transformCoordinates(
        data.coordinates,
        data.fromSystem,
        data.toSystem,
        data.units
      );

      setResult({
        original: data.coordinates,
        transformed,
        fromSystem: data.fromSystem,
        toSystem: data.toSystem,
        units: data.units,
      });
    } catch (err) {
      setError(err.message);
      console.error('Transformation error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Coordinate Transformation Tool
        </h1>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CoordinateForm onTransform={handleTransform} />
          <ResultDisplay result={result} />
        </div>
        
        <Map result={result} />
      </div>
    </div>
  );
}

export default App;
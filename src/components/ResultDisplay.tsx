import React from 'react';
import { TransformationResult } from '../types/coordinates';

interface ResultDisplayProps {
  result?: TransformationResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold">Transformation Results</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-700">Original Coordinates ({result.fromSystem})</h4>
          <p className="mt-1">
            X: {result.original.x.toFixed(2)} {result.units}<br />
            Y: {result.original.y.toFixed(2)} {result.units}
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700">Transformed Coordinates ({result.toSystem})</h4>
          <p className="mt-1">
            X: {result.transformed.x.toFixed(2)} {result.units}<br />
            Y: {result.transformed.y.toFixed(2)} {result.units}
          </p>
        </div>
      </div>
    </div>
  );
}
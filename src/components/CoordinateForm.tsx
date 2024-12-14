import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { CoordinateSystem, Units, Coordinates } from '../types/coordinates';

interface CoordinateFormProps {
  onTransform: (data: {
    coordinates: Coordinates;
    fromSystem: CoordinateSystem;
    toSystem: CoordinateSystem;
    units: Units;
  }) => void;
}

export function CoordinateForm({ onTransform }: CoordinateFormProps) {
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [fromSystem, setFromSystem] = useState<CoordinateSystem>('cassini');
  const [units, setUnits] = useState<Units>('meters');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTransform({
      coordinates,
      fromSystem,
      toSystem: fromSystem === 'cassini' ? 'utm' : 'cassini',
      units,
    });
  };

  const handleCoordinateChange = (
    axis: 'x' | 'y',
    value: string
  ) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setCoordinates(prev => ({
      ...prev,
      [axis]: isNaN(numValue) ? 0 : numValue
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">Coordinate Transformation</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">X Coordinate</label>
          <input
            type="number"
            value={coordinates.x || ''}
            onChange={(e) => handleCoordinateChange('x', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            step="any"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Y Coordinate</label>
          <input
            type="number"
            value={coordinates.y || ''}
            onChange={(e) => handleCoordinateChange('y', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            step="any"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">From System</label>
          <select
            value={fromSystem}
            onChange={(e) => setFromSystem(e.target.value as CoordinateSystem)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="cassini">Cassini</option>
            <option value="utm">UTM</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Units</label>
          <select
            value={units}
            onChange={(e) => setUnits(e.target.value as Units)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="meters">Meters</option>
            <option value="feet">Feet</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Transform Coordinates
      </button>
    </form>
  );
}
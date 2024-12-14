import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { TransformationResult } from '../types/coordinates';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  result?: TransformationResult;
}

export function Map({ result }: MapProps) {
  if (!result) return null;

  // Convert coordinates to lat/lng for display
  const originalPoint = [result.original.y, result.original.x];
  const transformedPoint = [result.transformed.y, result.transformed.x];

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={originalPoint}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={originalPoint}>
          <Popup>
            Original Point ({result.fromSystem})<br />
            X: {result.original.x.toFixed(2)}<br />
            Y: {result.original.y.toFixed(2)}
          </Popup>
        </Marker>
        <Marker position={transformedPoint}>
          <Popup>
            Transformed Point ({result.toSystem})<br />
            X: {result.transformed.x.toFixed(2)}<br />
            Y: {result.transformed.y.toFixed(2)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
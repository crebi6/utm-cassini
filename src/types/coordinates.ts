export type CoordinateSystem = 'cassini' | 'utm';

export interface Coordinates {
  x: number;
  y: number;
}

export interface UTMParameters {
  zone: number;
  isNorth: boolean;
}

export interface CassiniParameters {
  centralMeridian: number;
}

export type Units = 'meters' | 'feet';

export interface TransformationResult {
  original: Coordinates;
  transformed: Coordinates;
  fromSystem: CoordinateSystem;
  toSystem: CoordinateSystem;
  units: Units;
}
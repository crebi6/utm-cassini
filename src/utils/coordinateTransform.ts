import proj4 from 'proj4';
import { getProjectionDefinition } from './projectionDefinitions';
import { CoordinateSystem, Coordinates, Units } from '../types/coordinates';

export const metersToFeet = (meters: number): number => meters * 3.28084;
export const feetToMeters = (feet: number): number => feet / 3.28084;

export const transformCoordinates = (
  coords: Coordinates,
  fromSystem: CoordinateSystem,
  toSystem: CoordinateSystem,
  units: Units
): Coordinates => {
  try {
    // Convert feet to meters if needed
    let x = coords.x;
    let y = coords.y;
    if (units === 'feet') {
      x = feetToMeters(x);
      y = feetToMeters(y);
    }

    // Get projection definitions
    const fromProj = getProjectionDefinition(fromSystem);
    const toProj = getProjectionDefinition(toSystem);

    // Perform the transformation
    const [transformedX, transformedY] = proj4(fromProj, toProj, [x, y]);

    // Convert back to feet if needed
    if (units === 'feet') {
      return {
        x: metersToFeet(transformedX),
        y: metersToFeet(transformedY)
      };
    }

    return { x: transformedX, y: transformedY };
  } catch (error) {
    console.error('Transformation error:', error);
    throw new Error(`Failed to transform coordinates: ${error.message}`);
  }
};
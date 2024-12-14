import proj4 from 'proj4';

// Define the coordinate system definitions
export const getProjectionDefinition = (system: string, params?: { zone?: number, isNorth?: boolean, centralMeridian?: number }) => {
  switch (system) {
    case 'cassini':
      // Cassini projection with default central meridian if not specified
      const centralMeridian = params?.centralMeridian || 0;
      return `+proj=cass +lat_0=0 +lon_0=${centralMeridian} +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs`;
    
    case 'utm':
      // UTM projection with default zone 30N if not specified
      const zone = params?.zone || 30;
      const hemisphere = params?.isNorth ? 'north' : 'south';
      return `+proj=utm +zone=${zone} +${hemisphere} +ellps=WGS84 +datum=WGS84 +units=m +no_defs`;
    
    default:
      throw new Error(`Unsupported coordinate system: ${system}`);
  }
};
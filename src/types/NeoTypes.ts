export interface NearEarthObject {
    id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
    close_approach_data: Array<{
      close_approach_date: string;
      epoch_date_close_approach: number;
      orbiting_body: string;
      miss_distance: {
        kilometers: string;
        astronomical: string;
      };
      relative_velocity: {
        kilometers_per_second: string;
        kilometers_per_hour: string;
      };
    }>;
    orbital_data?: {
      orbit_id: string;
      orbit_determination_date: string;
      orbit_uncertainty: string;
      minimum_orbit_intersection: string;
      eccentricity: string;
      semi_major_axis: string;
      inclination: string;
      ascending_node_longitude: string;
      orbital_period: string;
      perihelion_distance: string;
      perihelion_time: string;
      aphelion_distance: string;
      jupiter_tisserand_invariant: string;
      epoch_osculation: string;
      nex_closest_approach: string;
    };
  }
  
  export interface NeoFeedResponse {
    links: {
      next: string;
      self: string;
      prev: string;
    };
    element_count: number;
    near_earth_objects: {
      [date: string]: NearEarthObject[];
    };
  }
  
  export interface NeoOverviewData {
    id: string;
    name: string;
    isHazardous: boolean;
    missDistanceKm: string;
    closeApproachDate: string;
    diameterKmMin: number;
    diameterKmMax: number;
    nasaJplUrl: string;
    relativeVelocityKmPs: string;
  }
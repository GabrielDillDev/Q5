// services/NeoService.ts
import { NeoFeedResponse, NeoOverviewData } from '../types/NeoTypes';

const API_KEY = process.env.NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

export async function getNeoFeedOverview(): Promise<NeoOverviewData | null> {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  try {
    const response = await fetch(`${BASE_URL}?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${API_KEY}`);
    
    if (!response.ok) {
      console.error(`Erro ao buscar dados da API NEO: ${response.statusText}`);
      return null;
    }

    const data: NeoFeedResponse = await response.json();

    const neosToday = data.near_earth_objects[formattedDate] || [];

    if (neosToday.length === 0) {
      return null;
    }

    const relevantNeo = neosToday.sort((a, b) => {
        if (a.is_potentially_hazardous_asteroid && !b.is_potentially_hazardous_asteroid) return -1;
        if (!a.is_potentially_hazardous_asteroid && b.is_potentially_hazardous_asteroid) return 1;

        const missDistanceA = parseFloat(a.close_approach_data[0]?.miss_distance?.kilometers || '0');
        const missDistanceB = parseFloat(b.close_approach_data[0]?.miss_distance?.kilometers || '0');
        return missDistanceA - missDistanceB;
    })[0];

    if (!relevantNeo || !relevantNeo.close_approach_data || relevantNeo.close_approach_data.length === 0) {
      return null;
    }

    const approach = relevantNeo.close_approach_data[0];

    const overview: NeoOverviewData = {
      id: relevantNeo.id,
      name: relevantNeo.name,
      isHazardous: relevantNeo.is_potentially_hazardous_asteroid,
      missDistanceKm: parseFloat(approach.miss_distance.kilometers).toLocaleString('en-US', { maximumFractionDigits: 0 }),
      closeApproachDate: new Date(approach.close_approach_date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }),
      diameterKmMin: relevantNeo.estimated_diameter.kilometers.estimated_diameter_min,
      diameterKmMax: relevantNeo.estimated_diameter.kilometers.estimated_diameter_max,
      nasaJplUrl: relevantNeo.nasa_jpl_url,
      relativeVelocityKmPs: parseFloat(approach.relative_velocity.kilometers_per_second).toLocaleString('en-US', { maximumFractionDigits: 2 }),
    };

    return overview;

  } catch (error) {
    console.error(error);
    return null;
  }
}
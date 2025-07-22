import { NeoFeedResponse, NearEarthObject, NeoOverviewData } from "../types/NeoTypes";

const API_KEY = process.env.NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov/neo/rest/v1/feed";

export async function getNeoFeedOverview(date?: string): Promise<NeoOverviewData | null> {
  const targetDate = date || new Date().toISOString().split("T")[0];

  try {
    const res = await fetch(`${BASE_URL}?start_date=${targetDate}&end_date=${targetDate}&api_key=${API_KEY}`);
    if (!res.ok) return null;

    const data: NeoFeedResponse = await res.json();
    const list = data.near_earth_objects[targetDate] || [];

    if (list.length === 0) return null;

    const sorted = list.sort((a, b) => {
      if (a.is_potentially_hazardous_asteroid && !b.is_potentially_hazardous_asteroid) return -1;
      if (!a.is_potentially_hazardous_asteroid && b.is_potentially_hazardous_asteroid) return 1;
      const distA = parseFloat(a.close_approach_data[0]?.miss_distance?.kilometers || "0");
      const distB = parseFloat(b.close_approach_data[0]?.miss_distance?.kilometers || "0");
      return distA - distB;
    })[0];

    const approach = sorted.close_approach_data[0];
    return {
      id: sorted.id,
      name: sorted.name,
      isHazardous: sorted.is_potentially_hazardous_asteroid,
      missDistanceKm: parseFloat(approach.miss_distance.kilometers).toLocaleString("en-US", { maximumFractionDigits: 0 }),
      closeApproachDate: new Date(approach.close_approach_date).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" }),
      diameterKmMin: sorted.estimated_diameter.kilometers.estimated_diameter_min,
      diameterKmMax: sorted.estimated_diameter.kilometers.estimated_diameter_max,
      nasaJplUrl: sorted.nasa_jpl_url,
      relativeVelocityKmPs: parseFloat(approach.relative_velocity.kilometers_per_second).toLocaleString("en-US", { maximumFractionDigits: 2 }),
    };
  } catch (err) {
    console.error("Erro no getNeoFeedOverview:", err);
    return null;
  }
}

export async function getNeoFeedFullList(date?: string): Promise<NearEarthObject[]> {
  const targetDate = date || new Date().toISOString().split("T")[0];

  try {
    const res = await fetch(`${BASE_URL}?start_date=${targetDate}&end_date=${targetDate}&api_key=${API_KEY}`);
    if (!res.ok) return [];

    const data: NeoFeedResponse = await res.json();
    return data.near_earth_objects[targetDate] || [];
  } catch (err) {
    console.error("Erro no getNeoFeedFullList:", err);
    return [];
  }
}

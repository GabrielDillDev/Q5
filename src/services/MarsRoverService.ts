import { MarsRoverPhoto } from "../types/MarsRoverTypes";

const API_KEY = process.env.NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

export async function getLatestMarsRoverPhoto(): Promise<MarsRoverPhoto | null> {
  const today = new Date();

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0];

    const res = await fetch(`${BASE_URL}?earth_date=${formattedDate}&api_key=${API_KEY}`);
    const data = await res.json();

    if (data.photos && data.photos.length > 0) {
      return data.photos[0];
    }
  }

  return null;
}

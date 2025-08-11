import { MarsRoverPhoto } from "../types/MarsRoverTypes";

const API_KEY = process.env.NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

export async function getLatestMarsRoverPhoto(): Promise<MarsRoverPhoto | null> {
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const res = await fetch(`${BASE_URL}?earth_date=${dateStr}&api_key=${API_KEY}`);
    const data = await res.json();
    if (data.photos?.length) return data.photos[0];
  }
  return null;
}

export async function getMarsRoverPhotosByDate(date: string): Promise<MarsRoverPhoto[]> {
  const res = await fetch(`${BASE_URL}?earth_date=${date}&api_key=${API_KEY}`);
  const data = await res.json();
  return data.photos || [];
}

export async function getLatestMarsRoverPhotos(): Promise<{ date: string; photos: MarsRoverPhoto[] }> {
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const res = await fetch(`${BASE_URL}?earth_date=${dateStr}&api_key=${API_KEY}`);
    const data = await res.json();
    if (data.photos?.length) {
      return { date: dateStr, photos: data.photos };
    }
  }
  return { date: today.toISOString().split("T")[0], photos: [] };
}

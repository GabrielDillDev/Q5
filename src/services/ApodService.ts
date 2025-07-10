import { ApodData } from "../types/ApodTypes";

const API_KEY = process.env.NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov/planetary/apod";

const isServer = typeof window === "undefined";
const BASE_API_URL = isServer ? "http://localhost:3000" : "";

export async function getAstronomyPicture(): Promise<ApodData> {
  const res = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Falha ao buscar imagem do dia da NASA");
  return res.json();
}

export async function getApodByDate(date: string): Promise<ApodData> {
  const url = `${BASE_API_URL}/api/apod-by-date?date=${date}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Falha ao buscar imagem pela data");
  return res.json();
}

export async function getApodHistory(start: string, end: string): Promise<ApodData[]> {
  const url = `${BASE_API_URL}/api/apod-history?start=${start}&end=${end}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao carregar histórico");
  const data = await res.json();
  return data;
}

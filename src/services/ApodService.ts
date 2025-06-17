const API_KEY = process.env.NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov/planetary/apod";

export async function getAstronomyPicture() {
  const res = await fetch(`${BASE_URL}?api_key=${API_KEY}`);

  if (!res.ok) {
    throw new Error("Falha ao buscar imagem do dia da NASA");
  }

  return res.json();
}

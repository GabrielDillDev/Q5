import { NextResponse } from "next/server";

const API_KEY = process.env.NASA_API_KEY!;
const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Parâmetro 'date' é obrigatório" }, { status: 400 });
  }

  try {
    const res = await fetch(`${BASE_URL}?earth_date=${date}&api_key=${API_KEY}`);
    const data = await res.json();
    return NextResponse.json(data.photos || []);
  } catch (_error) {
    return NextResponse.json({ error: "Erro ao buscar dados da NASA" }, { status: 500 });
  }
}

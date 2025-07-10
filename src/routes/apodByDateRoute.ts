import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Data inválida" }, { status: 400 });
  }

  const nasaRes = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date}`
  );

  if (!nasaRes.ok) {
    return NextResponse.json({ error: "Erro ao buscar imagem" }, { status: nasaRes.status });
  }

  const data = await nasaRes.json();
  return NextResponse.json(data);
}

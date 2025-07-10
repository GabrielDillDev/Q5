import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&start_date=${start}&end_date=${end}`);

  if (!res.ok) {
    return NextResponse.json({ error: "Erro na API da NASA" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(Array.isArray(data) ? data.reverse() : [data]);
}

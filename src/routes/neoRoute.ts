import { getNeoFeedFullList, getNeoFeedOverview } from "../services/NeoService";
import { NextResponse } from "next/server";

export async function handleNeoRoute(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json({ error: "Data é obrigatória" }, { status: 400 });
    }

    const [asteroids, overview] = await Promise.all([
      getNeoFeedFullList(dateParam),
      getNeoFeedOverview(dateParam),
    ]);

    return NextResponse.json({ asteroids, overview });
  } catch (err) {
    console.error("Erro na rota NEO:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

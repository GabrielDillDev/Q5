import AsteroidList from "../../components/AsteroidList";
import { getNeoFeedFullList, getNeoFeedOverview } from "../../services/NeoService";

interface Props {
  searchParams?: Promise<{ date?: string }>;
}

export default async function AsteroidsPage({ searchParams }: Props) {
  const params = await searchParams;
  const date = params?.date;

  const [asteroids, overview] = await Promise.all([
    getNeoFeedFullList(date),
    getNeoFeedOverview(date),
  ]);

  return <AsteroidList asteroids={asteroids} overview={overview} />;
}

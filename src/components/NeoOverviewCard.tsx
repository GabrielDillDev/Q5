// components/NeoOverviewCard.tsx
import { NeoOverviewData } from '../types/NeoTypes';
import Link from 'next/link';

interface NeoOverviewCardProps {
  data: NeoOverviewData | null;
}

export default function NeoOverviewCard({ data }: NeoOverviewCardProps) {
  if (!data) {
    return (
      <section className="py-16 px-4 bg-gray-900 text-white text-center">
        <p>No asteroid data available for today. Check back tomorrow!</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 text-6xl md:text-8xl">
          {data.isHazardous ? '⚠️' : '☄️'}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold mb-2">Asteroid Alert: {data.name}</h2>
          <p className="text-lg text-gray-300 mb-4">
            A near-Earth object approaching on {data.closeApproachDate}.
            <span className="block mt-2">
              Missing Earth by approximately {data.missDistanceKm} km.
            </span>
            <span className="block mt-1 text-sm text-gray-400">
              Traveling at {data.relativeVelocityKmPs} km/s.
            </span>
          </p>
          <div className="text-gray-400 text-sm mb-4">
            Estimated Diameter: {data.diameterKmMin.toFixed(2)} - {data.diameterKmMax.toFixed(2)} km
            {data.isHazardous && <span className="text-red-400 font-bold ml-2"> (Potentially Hazardous!)</span>}
          </div>
          <Link href={data.nasaJplUrl} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105"
          >
            View on NASA JPL
          </Link>
        </div>
      </div>
    </section>
  );
}
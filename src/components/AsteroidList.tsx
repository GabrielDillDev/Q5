"use client";

import { NearEarthObject, NeoOverviewData } from "../types/NeoTypes";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  asteroids: NearEarthObject[];
  overview: NeoOverviewData | null;
}

export default function AsteroidList({ asteroids: initialAsteroids, overview: initialOverview }: Props) {
  const [selectedDate, setSelectedDate] = useState("");
  const [asteroids, setAsteroids] = useState(initialAsteroids);
  const [overview, setOverview] = useState(initialOverview);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const reloadByDate = async () => {
    if (!selectedDate) return;
    try {
      const res = await fetch(`/api/asteroids?date=${selectedDate}`);
      if (!res.ok) throw new Error();
      const data = await res.json();

      if (!data.asteroids || data.asteroids.length === 0) {
        setAsteroids([]);
        setOverview(null);
        setError("Nenhum asteroide encontrado para essa data.");
      } else {
        setAsteroids(data.asteroids);
        setOverview(data.overview);
        setError("");
        router.push(`/asteroids?date=${selectedDate}`);
      }
    } catch {
      setAsteroids([]);
      setOverview(null);
      setError("Nenhum asteroide encontrado para essa data.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") reloadByDate();
  };

  const hazardousCount = asteroids.filter(a => a.is_potentially_hazardous_asteroid).length;
  const largestAsteroid = [...asteroids].sort((a, b) =>
    b.estimated_diameter.kilometers.estimated_diameter_max - a.estimated_diameter.kilometers.estimated_diameter_max
  )[0];

  return (
    <main className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Near‑Earth Asteroids</h1>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            onKeyDown={handleKeyDown}
            className="bg-gray-800 px-4 py-2 rounded text-white"
          />
          <button
            onClick={reloadByDate}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold cursor-pointer"
          >
            Carregar
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-6">{error}</p>
        )}

        <div className="mb-6 text-center text-sm text-gray-400">
          Total: {asteroids.length} asteroides | Potencialmente perigosos: {hazardousCount}
        </div>

        {asteroids.length > 0 && (
          <>
            {overview && (
              <div className="mb-6 p-6 bg-yellow-800 rounded-lg">
                <h2 className="text-xl font-bold">
                  Destaque: {overview.isHazardous ? "⚠️ Potencialmente Perigoso" : overview.name}
                </h2>
                <p>
                  Aproximação: {overview.closeApproachDate}, distância ~{overview.missDistanceKm} km, velocidade ~
                  {overview.relativeVelocityKmPs} km/s.
                </p>
              </div>
            )}

            {largestAsteroid && (
              <div className="mb-6 p-6 bg-purple-800 rounded-lg">
                <h2 className="text-xl font-bold">🔭 Maior asteroide do dia</h2>
                <p>
                  {largestAsteroid.name} — até {largestAsteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km de diâmetro.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {asteroids.map((asteroid) => {
                const approach = asteroid.close_approach_data[0];
                const dmin = asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2);
                const dmax = asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);

                return (
                  <div
                    key={asteroid.id}
                    className={`${
                      asteroid.is_potentially_hazardous_asteroid ? "bg-red-800" : "bg-gray-800"
                    } p-6 rounded-lg shadow-md transition`}
                  >
                    <h3 className="text-2xl font-bold mb-2">{asteroid.name}</h3>
                    <p className="text-sm mb-1">Data: {approach.close_approach_date}</p>
                    <p className="text-sm mb-1">
                      Distância: {parseFloat(approach.miss_distance.kilometers).toLocaleString()} km
                    </p>
                    <p className="text-sm mb-1">
                      Velocidade: {parseFloat(approach.relative_velocity.kilometers_per_second).toFixed(2)} km/s
                    </p>
                    <p className="text-sm mb-1">Diâmetro: {dmin}–{dmax} km</p>
                    <p className="text-sm mb-4">Órbita: {approach.orbiting_body}</p>
                    <Link
                      href={asteroid.nasa_jpl_url}
                      target="_blank"
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block"
                    >
                      Ver no JPL
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { MarsRoverPhoto } from "../types/MarsRoverTypes";

interface Props {
  initialPhotos: MarsRoverPhoto[];
  initialDate: string;
}

export default function MarsRoverGallery({ initialPhotos, initialDate }: Props) {
  const [selectedDate, setSelectedDate] = useState(initialDate || "");
  const [photos, setPhotos] = useState<MarsRoverPhoto[]>(initialPhotos);
  const [error, setError] = useState("");

  const fetchPhotosByDate = async () => {
    if (!selectedDate) return;

    try {
      const res = await fetch(`/api/mars-rover?date=${selectedDate}`);
      if (!res.ok) throw new Error();
      const data = await res.json();

      if (!data.length) {
        setPhotos([]);
        setError("Nenhuma foto encontrada para essa data.");
      } else {
        setPhotos(data);
        setError("");
      }
    } catch {
      setPhotos([]);
      setError("Erro ao buscar fotos. Tente outra data.");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchPhotosByDate();
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Mars Rover Photos</h1>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            onKeyDown={handleKeyDown}
            className="bg-gray-800 px-4 py-2 rounded text-white"
          />
          <button
            onClick={fetchPhotosByDate}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold cursor-pointer"
          >
            Carregar
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img
                src={photo.img_src}
                alt={`Mars Rover - ${photo.camera.full_name}`}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 text-sm">
                <p><strong>Data na Terra:</strong> {photo.earth_date}</p>
                <p><strong>Câmera:</strong> {photo.camera.full_name} ({photo.camera.name})</p>
                <p><strong>Rover:</strong> {photo.rover.name}</p>
                <p><strong>Status:</strong> {photo.rover.status}</p>
                <p><strong>Pouso:</strong> {photo.rover.landing_date}</p>
                <p><strong>Lançamento:</strong> {photo.rover.launch_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

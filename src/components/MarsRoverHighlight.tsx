import { MarsRoverPhoto } from "../types/MarsRoverTypes";

interface Props {
  data: MarsRoverPhoto | null;
}

export default function MarsRoverHighlight({ data }: Props) {
  if (!data) {
    return (
      <section className="py-16 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-8">Explore the Latest from the Mars Rover</h2>
        <p className="text-xl">No recent Mars Rover photos available.</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Explore the Latest from the Mars Rover</h2>
        <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800">
          <img
            src={data.img_src}
            alt={`Mars Rover - ${data.rover.name}`}
            className="w-full h-auto object-contain"
          />
          <div className="p-6">
            <h3 className="text-3xl font-bold mb-2">
              Latest from Mars Rover: {data.rover.name}
            </h3>
            <p className="text-gray-300 mb-2">
              <strong>Camera:</strong> {data.camera.full_name} ({data.camera.name})
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Earth Date:</strong> {data.earth_date}
            </p>
            <p className="text-gray-500">
              <strong>Status:</strong> {data.rover.status} — Landed on {data.rover.landing_date}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

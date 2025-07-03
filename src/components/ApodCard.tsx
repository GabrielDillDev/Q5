import { ApodData } from "../types/ApodTypes";

interface Props {
  data: ApodData;
}

export default function ApodCard({ data }: Props) {
  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Discover Today’s Cosmic Wonder
        </h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-2">{data.title}</h3>
          <p className="text-sm text-gray-400 mb-4">{data.date}</p>
          {data.media_type === "image" ? (
            <img
              src={data.url}
              alt={data.title}
              className="w-full rounded-md mb-4"
            />
          ) : (
            <iframe
              src={data.url}
              title={data.title}
              allow="fullscreen"
              className="w-full h-64 rounded-md mb-4"
            />
          )}
          <p className="text-base">{data.explanation}</p>
          {data.copyright && (
            <p className="text-sm text-right mt-2 text-gray-500">
              © {data.copyright}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

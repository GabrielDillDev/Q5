import { ApodData } from "../types/ApodTypes";

interface Props {
  data: ApodData;
}

export default function ApodCard({ data }: Props) {
  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="text-sm text-gray-400 mb-4">{data.date}</p>
      {data.media_type === "image" ? (
        <img src={data.url} alt={data.title} className="w-full rounded-md mb-4" />
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
        <p className="text-sm text-right mt-2 text-gray-500">© {data.copyright}</p>
      )}
    </div>
  );
}

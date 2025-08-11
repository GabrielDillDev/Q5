"use client";

import { useState } from "react";
import { ApodData } from "../types/ApodTypes";
import { getApodHistory, getApodByDate } from "../services/ApodService";

interface Props {
  initialData: ApodData[];
  initialStartDate: string;
  initialEndDate: string;
}

function getPreviousDate(dateStr: string, daysBack: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - daysBack);
  return date.toISOString().split("T")[0];
}

const MIN_DATE = "1995-06-16";

export default function ApodHistoryList({ initialData, initialStartDate, initialEndDate }: Props) {
  const [items, setItems] = useState(initialData);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [_endDate, setEndDate] = useState(initialEndDate);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ApodData | null>(null);
  const [inputDate, setInputDate] = useState("");
  const [error, setError] = useState("");
  const [loadMoreError, setLoadMoreError] = useState("");
  const [searchedItem, setSearchedItem] = useState<ApodData | null>(null);

  const loadMore = async () => {
    setLoadMoreError("");
    if (loading || startDate <= MIN_DATE) {
      setHasMore(false);
      return;
    }

    setLoading(true);
    try {
      const newEndDate = getPreviousDate(startDate, 1);
      const newStartDate = getPreviousDate(newEndDate, 11);

      const fetched = await getApodHistory(newStartDate < MIN_DATE ? MIN_DATE : newStartDate, newEndDate);
      const filtered = fetched.filter(f => !items.some(i => i.date === f.date));

      if (filtered.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...filtered]);
        setStartDate(newStartDate < MIN_DATE ? MIN_DATE : newStartDate);
        setEndDate(newEndDate);
      }
    } catch {
      setLoadMoreError("Erro ao carregar mais imagens.");
    }
    setLoading(false);
  };

  const handleDateSearch = async () => {
    if (!inputDate) return;
    setError("");
    try {
      const result = await getApodByDate(inputDate);
      setSearchedItem(result);
    } catch {
      setError("Data inválida ou imagem não encontrada.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleDateSearch();
    }
  };

  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Recent Astronomy Pictures</h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <input
            type="date"
            className="bg-gray-800 px-4 py-2 rounded text-white"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            onKeyDown={handleKeyPress}
            max={new Date().toISOString().split("T")[0]}
            min={MIN_DATE}
          />
          <button
            onClick={handleDateSearch}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold transition cursor-pointer"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {searchedItem && (
          <div className="flex justify-center mb-10">
            <div
              key={`search-${searchedItem.date}`}
              className="relative bg-gray-900 p-4 rounded-lg shadow-md cursor-pointer max-w-sm w-full flex flex-col justify-between h-[500px]"
              onClick={() => searchedItem.media_type === "image" && setSelectedImage(searchedItem)}
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchedItem(null);
                }}
              >
                ×
              </button>
              <div>
                <h2 className="text-xl font-semibold mb-2">{searchedItem.title}</h2>
                <p className="text-sm text-gray-400 mb-2">{searchedItem.date}</p>
                {searchedItem.media_type === "image" ? (
                  <img src={searchedItem.url} alt={searchedItem.title} className="w-full rounded mb-4 h-48 object-cover" />
                ) : (
                  <iframe
                    src={searchedItem.url}
                    title={searchedItem.title}
                    allow="fullscreen"
                    className="w-full h-48 rounded mb-4"
                  />
                )}
                <p className="text-sm text-gray-300">{searchedItem.explanation.slice(0, 100)}...</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.date}
              className="bg-gray-900 p-4 rounded-lg shadow-md cursor-pointer flex flex-col justify-between h-[500px]"
              onClick={() => item.media_type === "image" && setSelectedImage(item)}
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm text-gray-400 mb-2">{item.date}</p>
                {item.media_type === "image" ? (
                  <img src={item.url} alt={item.title} className="w-full rounded mb-4 h-48 object-cover" />
                ) : (
                  <iframe
                    src={item.url}
                    title={item.title}
                    allow="fullscreen"
                    className="w-full h-48 rounded mb-4"
                  />
                )}
                <p className="text-sm text-gray-300">{item.explanation.slice(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          {hasMore ? (
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Carregando..." : "Ver mais"}
            </button>
          ) : (
            <p className="text-gray-500">Não há mais imagens para carregar.</p>
          )}
          {loadMoreError && <p className="text-red-500 mt-2">{loadMoreError}</p>}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative bg-gray-900 p-6 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-6 text-white text-2xl font-bold cursor-pointer"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{selectedImage.date}</p>
              {selectedImage.media_type === "image" ? (
                <img src={selectedImage.url} alt={selectedImage.title} className="w-full rounded mb-4" />
              ) : (
                <iframe
                  src={selectedImage.url}
                  title={selectedImage.title}
                  allow="fullscreen"
                  className="w-full h-96 rounded mb-4"
                />
              )}
              <p className="text-gray-300">{selectedImage.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

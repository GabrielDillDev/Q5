import HeroSection from "../components/HeroSection";
import ApodCard from "../components/ApodCard";
import { getAstronomyPicture } from "../services/ApodService";

export default async function Home() {
  const data = await getAstronomyPicture();

  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <section id="explore" className="py-16 px-4">
        <ApodCard data={data} />
      </section>
      <section id="explore-sections" className="py-16 px-4">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">Dive Into Space Exploration</h2>
        <p className="text-center text-gray-300">Navigation categories coming soon!</p>
      </section>
    </main>
  );
}
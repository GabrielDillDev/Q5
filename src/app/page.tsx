import HeroSection from "../components/HeroSection";
import ApodCard from "../components/ApodCard";
import { getAstronomyPicture } from "../services/ApodService";
import ExploreCategories from "../components/ExploreCategories";

export default async function Home() {
  const data = await getAstronomyPicture();

  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <section id="explore" className="py-16 px-4">
        <ApodCard data={data} />
      </section>
      <section id="explore-sections" className="py-16 px-4">
        <ExploreCategories /> 
      </section>
    </main>
  );
}
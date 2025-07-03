import HeroSection from "../components/HeroSection";
import ApodCard from "../components/ApodCard";
import ExploreCategories from "../components/ExploreCategories";
import NeoOverviewCard from "../components/NeoOverviewCard";
import MarsRoverHighlight from "../components/MarsRoverHighlight";

import { getAstronomyPicture } from "../services/ApodService";
import { getNeoFeedOverview } from "../services/NeoService";
import { getLatestMarsRoverPhoto } from "../services/MarsRoverService";

export default async function Home() {
  const apodData = await getAstronomyPicture();
  const neoData = await getNeoFeedOverview();
  const marsData = await getLatestMarsRoverPhoto();

  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      
      <section id="explore" className="py-16 px-4">
        <ApodCard data={apodData} />
      </section>
      
      <section id="explore-sections" className="py-16 px-4">
        <ExploreCategories />
      </section>
      
      <NeoOverviewCard data={neoData} />
      
      <MarsRoverHighlight data={marsData} />
    </main>
  );
}

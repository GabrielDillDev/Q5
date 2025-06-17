export default function HeroSection() {
    return (
      <section className="text-center py-20 px-6 bg-gradient-to-b from-black via-slate-900 to-black">
        <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">
          Q5 - NASA Explorer
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
          Access and explore real NASA data through a clean and intuitive interface. 
          Astronomy, Mars rovers, near-Earth objects and more.
        </p>
        <a
          href="#explore"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          Explore Now
        </a>
      </section>
    );
  }
  
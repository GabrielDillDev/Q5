import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide text-blue-400 hover:text-blue-300 transition">
          Q5 - NASA Explorer
        </Link>
        <nav className="space-x-4 text-sm md:text-base">
          <Link href="/apod-history" className="hover:text-blue-400 transition">
            APOD
          </Link>
          <Link href="/asteroids" className="hover:text-blue-400 transition">
            Asteroids
          </Link>
          <Link href="/mars-rover" className="hover:text-blue-400 transition">
            Mars Rovers
          </Link>
        </nav>
      </div>
    </header>
  );
}

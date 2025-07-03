import Link from 'next/link';
import { CategoryCardProps } from '../types/CategoryTypes';

const categories: CategoryCardProps[] = [
  {
    title: 'Asteroid Discoveries',
    description: 'Explore near-Earth objects and fascinating asteroid data.',
    href: '/asteroids',
    icon: '🚀',
  },
  {
    title: 'Mars Rover Expeditions',
    description: 'See the red planet through the eyes of Mars rovers.',
    href: '/mars-rovers',
    icon: '🤖',
  },
  {
    title: 'Astronomy Picture of the Day',
    description: 'Discover the daily cosmic wonder from NASA.',
    href: '/apod-history',
    icon: '🌌',
  },
];

export default function ExploreCategories() {
  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-12">Dive Into Space Exploration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={category.title}
            className={`${index === 2 ? 'md:col-span-2 flex justify-center' : ''}`}
          >
            <Link href={category.href}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col items-center text-center w-80 mx-auto">
                <span className="text-5xl mb-4" role="img" aria-label={category.title}>
                  {category.icon}
                </span>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-300">{category.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

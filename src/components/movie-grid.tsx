import { Genre, Movie } from '@/types/movie'

interface MovieGridProps {
  movies: Movie[]
}

export const GENRE_COLORS: Record<Genre, string> = {
  'Horror': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'Action': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'Comedy': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'Drama': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'Sci-Fi': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Thriller': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
}


export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 hover:-translate-y-2"
        >
          <div className="p-6">
            {/* Genre Badge */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${GENRE_COLORS[movie.genre]}`}>
                {movie.genre}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {movie.title}
            </h3>

            {/* Blurb */}
            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
              {movie.blurb}
            </p>

            {/* Link Button */}
            <a
              href={movie.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-300"
            >
              Watch Now
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

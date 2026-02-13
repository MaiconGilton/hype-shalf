import { sampleMovies } from '@/data/movies'
import { MovieGrid } from '@/components/movie-grid'
import { AddRecommendationCTA } from '@/components/add-recommendation-cta'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            HypeShelf - Movie Recommendations
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Collect and share the stuff you’re hyped about.
          </p>
        </div>

        <MovieGrid movies={sampleMovies} />

        <AddRecommendationCTA />
      </div>
    </div>
  )
}

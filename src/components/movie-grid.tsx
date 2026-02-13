import { Movie } from '@/types/movie'
import { MovieCard } from './movie-card'
import { EmptyState } from './empty-state'

interface MovieGridProps {
  movies: Movie[]
  currentUserId?: string
  isAdmin?: boolean
}

export function MovieGrid({ movies, currentUserId, isAdmin }: MovieGridProps) {
  if (movies.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          currentUserId={currentUserId}
          isAdmin={isAdmin}
          showAuthor={!!currentUserId}
        />
      ))}
    </div>
  )
}

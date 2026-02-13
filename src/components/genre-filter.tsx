'use client'

import { GENRES } from '@/constants/genre'
import { Genre } from '@/types/movie'

interface GenreFilterProps {
  currentGenre?: Genre
  onGenreChange?: (genre?: Genre) => void
}

export function GenreFilter({ currentGenre, onGenreChange }: GenreFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {GENRES.map((genre) => {
          const isActive = genre.value === 'all' ? !currentGenre : currentGenre === genre.value

          return (
            <button
              key={genre.value}
              onClick={() => onGenreChange?.(genre.value === 'all' ? undefined : genre.value as Genre)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${isActive
                ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-slate-700'
                }`}
            >
              <span>{genre.emoji}</span>
              <span>{genre.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

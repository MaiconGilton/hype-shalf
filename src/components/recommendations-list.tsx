'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Genre } from '@/types/movie'
import { GenreFilter } from './genre-filter'
import { MovieGrid } from './movie-grid'

interface User {
  id: string
  name?: string
  imageUrl?: string
}

interface Movie {
  id: string
  title: string
  genre: Genre
  link: string
  blurb: string
  staffPick: boolean
  user: User
}

interface RecommendationsListProps {
  initialRecommendations: Movie[]
  currentUserId?: string
  isAdmin?: boolean
  initialGenre?: Genre
}

export function RecommendationsList({
  initialRecommendations,
  currentUserId,
  isAdmin,
  initialGenre,
}: RecommendationsListProps) {
  const router = useRouter()
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(initialGenre)
  const [isPending, startTransition] = useTransition()

  const handleGenreChange = (genre?: Genre) => {
    setSelectedGenre(genre)

    const url = new URL(window.location.href)

    if (genre) {
      url.searchParams.set('genre', genre)
    } else {
      url.searchParams.delete('genre')
    }

    // Use startTransition to track loading state
    startTransition(() => {
      router.replace(`${url.pathname}${url.search}`)
      router.refresh()
    })
  }

  return (
    <div className='space-y-4'>
      <GenreFilter
        currentGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      {/* Loading overlay */}
      {isPending && (
        <div className="px-6 py-3 flex items-center gap-3">
          <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />

          <span className="font-semibold text-gray-900 dark:text-white">
            Loading recommendations...
          </span>
        </div>
      )}

      {/* Show skeleton on first load, grid on subsequent loads with opacity */}
      <div className={`transition-opacity duration-200 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        <MovieGrid
          movies={initialRecommendations}
          currentUserId={currentUserId}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  )
}

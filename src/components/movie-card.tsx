'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Movie } from '@/types/movie'
import { GENRE_COLORS } from '@/constants/genre'

interface MovieCardProps {
  movie: Movie
  currentUserId?: string
  isAdmin?: boolean
  showAuthor?: boolean
}

export function MovieCard({ movie, currentUserId, isAdmin, showAuthor = true }: MovieCardProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingStaffPick, setTogglingStaffPick] = useState<string | null>(null)

  const isOwner = currentUserId === movie.user?.id
  const canDelete = isAdmin || isOwner

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recommendation?')) return

    setDeletingId(id)
    try {
      const response = await fetch(`/api/recommendations?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete')
      }

      router.refresh()
    } catch (error: any) {
      alert(error.message || 'Failed to delete recommendation')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleStaffPick = async (id: string, currentStaffPick: boolean) => {
    setTogglingStaffPick(id)
    try {
      const response = await fetch('/api/recommendations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, staffPick: !currentStaffPick }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update staff pick')
      }

      router.refresh()
    } catch (error: any) {
      alert(error.message || 'Failed to update staff pick')
    } finally {
      setTogglingStaffPick(null)
    }
  }

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 hover:-translate-y-2 relative">
      {/* Staff Pick Badge */}
      {movie.staffPick && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-linear-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Staff Pick
          </div>
        </div>
      )}

      <div className="p-6">
        {/* User Info - Only show if showAuthor is true */}
        {showAuthor && movie.user?.name && (
          <div className="flex items-center gap-2 mb-4">
            {movie.user.imageUrl && (
              <img
                src={movie.user.imageUrl}
                alt={movie.user.name}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {movie.user.name}
            </span>
          </div>
        )}

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
          Learn More
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

        {/* Actions - Only show if currentUserId exists */}
        {currentUserId && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 flex gap-2">
            {/* Delete Button */}
            {canDelete && (
              <button
                onClick={() => handleDelete(movie.id)}
                disabled={deletingId === movie.id}
                className="flex-1 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all disabled:opacity-50"
              >
                {deletingId === movie.id ? 'Deleting...' : 'Delete'}
              </button>
            )}

            {/* Admin: Toggle Staff Pick */}
            {isAdmin && (
              <button
                onClick={() => handleToggleStaffPick(movie.id, movie.staffPick)}
                disabled={togglingStaffPick === movie.id}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 ${movie.staffPick
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
              >
                {togglingStaffPick === movie.id
                  ? 'Updating...'
                  : movie.staffPick
                    ? '⭐ Unmark'
                    : '⭐ Staff Pick'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

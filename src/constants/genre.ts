import { Genre } from '@/types/movie'

export const GENRES: { value: Genre | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🎬' },
  { value: 'horror', label: 'Horror', emoji: '😱' },
  { value: 'action', label: 'Action', emoji: '💥' },
  { value: 'comedy', label: 'Comedy', emoji: '😂' },
  { value: 'drama', label: 'Drama', emoji: '🎭' },
  { value: 'sci-fi', label: 'Sci-Fi', emoji: '🚀' },
  { value: 'thriller', label: 'Thriller', emoji: '🔪' },
]

export const GENRE_COLORS: Record<Genre, string> = {
  'horror': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'action': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'comedy': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'drama': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'sci-fi': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'thriller': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
}
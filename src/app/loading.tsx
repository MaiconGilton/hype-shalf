import { GenreFilter } from '@/components/genre-filter'

export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            HypeShelf
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Collect and share the stuff you're hyped about.
          </p>
        </div>

        {/* Genre Filter - shown during loading to prevent layout shift */}
        <GenreFilter />

        {/* Recommendation Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700"
            >
              <div className="p-6 space-y-4">
                {/* User Info Skeleton */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                </div>

                {/* Genre Badge Skeleton */}
                <div className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />

                {/* Title Skeleton */}
                <div className="h-8 w-3/4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />

                {/* Blurb Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                </div>

                {/* Link Button Skeleton */}
                <div className="h-6 w-28 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

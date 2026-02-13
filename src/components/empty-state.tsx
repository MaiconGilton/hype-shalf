export function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-12 max-w-md text-center border border-gray-100 dark:border-slate-700">
        {/* Icon */}
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          No recommendations found
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Try selecting a different genre or check back later for new recommendations.
        </p>
      </div>
    </div>
  )
}

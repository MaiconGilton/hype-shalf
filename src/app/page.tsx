import { auth, currentUser } from '@clerk/nextjs/server'
import { AddRecommendationCTA } from '@/components/add-recommendation-cta'
import { RecommendationsList } from '@/components/recommendations-list'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: PageProps) {
  const { userId } = await auth()
  const params = await searchParams
  const genre = params.genre as string
  const page = parseInt(params.page as string) || 1

  // Determine if user is admin
  let isAdmin = false
  if (userId) {
    const user = await currentUser()
    isAdmin = user?.publicMetadata?.role === 'admin'
  }

  // Fetch recommendations
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const _params = new URLSearchParams()
  _params.append('page', page.toString())
  if (genre) _params.append('genre', genre.toString())
  const response = await fetch(
    `${baseUrl}/api/recommendations?${_params}`,
    { cache: 'no-store' }
  )
  const data = await response.json()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Tagline */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-12">
          Collect and share the stuff you're hyped about.
        </p>

        <RecommendationsList
          initialRecommendations={data.recommendations}
          currentUserId={userId || undefined}
          isAdmin={isAdmin}
          initialGenre={genre as any}
        />

        {/* Pagination Info */}
        {data.pagination.totalPages > 1 && (
          <div className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Page {data.pagination.page} of {data.pagination.totalPages}
          </div>
        )}

        <AddRecommendationCTA />
      </div>
    </div>
  )
}

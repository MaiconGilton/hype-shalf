import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { Genre } from '@/types/movie'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function GET(request: NextRequest) {
  try {
    // Check authentication status
    const { userId: currentUserId } = await auth()

    const searchParams = request.nextUrl.searchParams
    const genre = searchParams.get('genre') as Genre | null
    const numItems = parseInt(searchParams.get('numItems') || '10')
    const cursor = searchParams.get('cursor')

    // Fetch recommendations from Convex
    const result = await convex.query(api.recommendations.listByGenre, {
      genre: genre || undefined,
      paginationOpts: {
        numItems,
        cursor: cursor || null,
      },
    })

    // Only fetch user data if user is authenticated
    if (currentUserId) {
      // Get unique user IDs
      const userIds = [...new Set(result.page.map((r) => r.userId))]

      // Fetch user data from Clerk
      const users = await Promise.all(
        userIds.map(async (userId) => {
          try {
            const user = await (await clerkClient()).users.getUser(userId)
            return {
              id: userId,
              name: user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.username || undefined,
              imageUrl: user.imageUrl || undefined,
            }
          } catch {
            return { id: userId, name: undefined, imageUrl: undefined }
          }
        })
      )

      // Create user map
      const usersMap = new Map(users.map((user) => [user.id, user]))

      // Attach user data to recommendations
      const recommendationsWithUsers = result.page.map((rec) => ({
        id: rec._id,
        title: rec.title,
        genre: rec.genre,
        link: rec.link,
        blurb: rec.blurb,
        staffPick: rec.staffPick,
        user: usersMap.get(rec.userId) || {
          id: rec.userId,
          name: undefined,
          imageUrl: undefined,
        },
      }))

      return NextResponse.json({
        recommendations: recommendationsWithUsers,
        pagination: {
          continueCursor: result.continueCursor,
          isDone: result.isDone,
        },
      })
    }

    // For unauthenticated users, return recommendations without user data
    const recommendationsWithoutUsers = result.page.map((rec) => ({
      id: rec._id,
      title: rec.title,
      genre: rec.genre,
      link: rec.link,
      blurb: rec.blurb,
      staffPick: rec.staffPick,
      user: {
        id: rec.userId,
        name: undefined,
        imageUrl: undefined,
      },
    }))

    return NextResponse.json({
      recommendations: recommendationsWithoutUsers,
      pagination: {
        continueCursor: result.continueCursor,
        isDone: result.isDone,
      },
    })
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { title, genre, link, blurb } = body

    // Validate required fields
    if (!title || !genre || !link || !blurb) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to Convex (only userId, no user metadata)
    const recommendationId = await convex.mutation(api.recommendations.create, {
      title,
      genre,
      link,
      blurb,
      userId,
    })

    return NextResponse.json(
      { success: true, id: recommendationId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating recommendation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user role
    const user = await currentUser()
    const userRole = user?.publicMetadata?.role === 'admin' ? 'admin' : 'user'

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing recommendation ID' },
        { status: 400 }
      )
    }

    await convex.mutation(api.recommendations.deleteRecommendation, {
      id: id as Id<"recommendations">,
      userId,
      userRole,
    } as any)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting recommendation:', error)

    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user role
    const user = await currentUser()
    const userRole = user?.publicMetadata?.role === 'admin' ? 'admin' : 'user'

    const body = await request.json()
    const { id, staffPick } = body

    if (!id || typeof staffPick !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    await convex.mutation(api.recommendations.markAsStaffPick, {
      id: id as Id<"recommendations">,
      staffPick,
      userRole,
    } as any)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating staff pick:', error)

    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

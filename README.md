# HypeShelf

A modern, full-stack recommendation sharing platform with role-based access control. Built with Next.js, Convex, and Clerk.

## ✨ Features

### 🔐 Role-Based Access Control (RBAC)
- **Public Users**: Browse recommendations and filter by genre
- **Authenticated Users**: Add and manage their own recommendations
- **Admins**: Full control over all recommendations and staff pick curation

### 🎨 Modern UI/UX
- Sticky navigation and genre filters
- Smooth loading states with skeleton UI
- Empty state handling
- Dark mode support
- Responsive design
- Zero layout shift

### 🎯 Core Functionality
- Genre-based filtering (Horror, Action, Comedy, Drama, Sci-Fi, Thriller)
- Staff Pick curation system
- Real-time updates with Convex
- Secure authentication with Clerk
- Optimized performance (conditional data fetching)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- [Clerk](https://clerk.com) account
- [Convex](https://convex.dev) account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hype-shelf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...

   # Convex
   NEXT_PUBLIC_CONVEX_URL=https://...

   # Optional: for production
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Initialize Convex**
   ```bash
   npx convex dev
   ```
   This will create your Convex deployment and push the schema.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

See [TESTING.md](./TESTING.md) for comprehensive testing instructions, including:
- Setting up test users (admin and regular)
- Testing all RBAC features
- Complete testing checklist

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Convex (database + serverless functions)
- **Authentication**: Clerk
- **Deployment**: Vercel (frontend) + Convex (backend)

### Project Structure

```
hype-shelf/
├── convex/                  # Convex backend
│   ├── schema.ts           # Database schema
│   ├── recommendations.ts  # Mutations and queries
│   └── _generated/         # Auto-generated types
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── api/            # API routes
│   │   ├── layout.tsx      # Root layout
│   │   ├── loading.tsx     # Loading UI
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── header.tsx      # Navigation header
│   │   ├── genre-filter.tsx
│   │   ├── movie-card.tsx
│   │   ├── empty-state.tsx
│   │   └── ...
│   ├── constants/          # App constants
│   │   └── genre.ts        # Genre definitions
│   └── types/              # TypeScript types
│       └── movie.ts
├── TESTING.md              # Testing guide
└── README.md               # This file
```

### Database Schema

**Recommendations Table:**
- `title`: string
- `genre`: enum (horror | action | comedy | drama | sci-fi | thriller)
- `link`: string
- `blurb`: string
- `userId`: string (Clerk user ID)
- `staffPick`: boolean
- `createdAt`: number (timestamp)
- `updatedAt`: number (timestamp)

**Indexes:**
- `by_userId`, `by_genre`, `by_staffPick`

## 🔑 Role Management

Roles are managed through Clerk's `publicMetadata`:

### Setting Admin Role

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to Users
3. Select a user
4. Under **Public metadata**, add:
   ```json
   {
     "role": "admin"
   }
   ```

### Permission Matrix

| Feature | Public | User | Admin |
|---------|--------|------|-------|
| View recommendations | ✅ | ✅ | ✅ |
| See author info | ❌ | ✅ | ✅ |
| Filter by genre | ✅ | ✅ | ✅ |
| Add recommendations | ❌ | ✅ | ✅ |
| Delete own | ❌ | ✅ | ✅ |
| Delete any | ❌ | ❌ | ✅ |
| Mark staff picks | ❌ | ❌ | ✅ |

## 🎨 Key Features Explained

### Sticky Genre Filters
Genre filters remain visible while scrolling, providing quick access to filtering without losing context.

### Performance Optimization
- User data from Clerk is only fetched when users are authenticated
- Reduces API calls for public viewers
- Improves page load times

### Zero Layout Shift
Genre filters are displayed during loading states, preventing content jump when the page loads.

### Empty States
Clean, helpful empty state UI when no recommendations match the selected filter.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Convex Deployment

Convex automatically deploys when you push to production. See [Convex documentation](https://docs.convex.dev/production/deployment) for details.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key (server-side) | Yes |
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | Yes |
| `NEXT_PUBLIC_APP_URL` | App URL (for API calls) | Production only |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Convex](https://convex.dev/)
- [Clerk](https://clerk.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Built with ❤️ for sharing great recommendations

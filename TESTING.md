# Testing Guide

This guide will help you set up test users to explore all features of HypeShelf.

## Prerequisites

Before you can test HypeShelf, you need to set up your own Clerk application and Convex project.

### 1. Create a Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click **Create application**
3. Name it "HypeShelf" (or any name you prefer)
4. Choose your authentication methods (Email is sufficient for testing)
5. Click **Create application**
6. You'll be redirected to the application dashboard

### 2. Get Your Clerk API Keys

1. In your Clerk application dashboard, go to **API Keys**
2. Copy the following keys:
   - **Publishable Key** (starts with `pk_test_...`)
   - **Secret Key** (starts with `sk_test_...`)

### 3. Set Up Convex

1. If you haven't already, run `npx convex dev` in the project directory
2. Follow the prompts to create a Convex account and project
3. Copy your **Convex URL** from the terminal output

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  # Your Clerk publishable key
CLERK_SECRET_KEY=sk_test_...                   # Your Clerk secret key
NEXT_PUBLIC_CONVEX_URL=https://...             # Your Convex deployment URL
```

### 5. Start the Application

Run both development servers:

```bash
# Terminal 1
npx convex dev

# Terminal 2
npm run dev
```

Now you're ready to create test users!

## Setting Up Test Users

To test all features, you'll need two accounts: one regular user and one admin.

### Step 1: Create Regular User Account

1. Visit `http://localhost:3000`
2. Sign up with your own email address
3. Complete the sign-up process
4. This account will automatically have the default `'user'` role

### Step 2: Create Admin User Account

1. Sign out from your first account
2. Sign up with a **different email address** (you can use an email alias or another email you own)
3. Complete the sign-up process

### Step 3: Set Admin Role

Now convert your second account to an admin:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your HypeShelf application
3. Navigate to **Users** section
4. Click on your second user account (the one you want to make admin)
5. Scroll to **Metadata** section
6. Click **Edit** under **Public metadata**
7. Add the following JSON:
   ```json
   {
     "role": "admin"
   }
   ```
8. Click **Save**
9. Sign out and sign back in to the app for the role change to take effect

## Testing Different User Experiences

### Public User (Not Signed In)

**What to test:**
- Browse all recommendations
- Filter by genre (sticky filters that stay visible while scrolling)
- See staff pick badges on curated content
- **Cannot** see author information
- **Cannot** see action buttons
- Can see "Get started" button to sign up

### Regular User

Sign in with the regular user account you created.

**What to test:**
- ✅ View all recommendations with author information
- ✅ Filter by genre
- ✅ Add new recommendations
- ✅ Delete own recommendations
- ✅ See who added each recommendation
- ❌ Cannot delete other users' recommendations
- ❌ Cannot mark staff picks

### Admin User

Sign in with the admin user account you created (the one with admin role set in Clerk).

**What to test:**
- ✅ All regular user features
- ✅ Delete **any** recommendation (not just own)
- ✅ Mark/unmark recommendations as "Staff Picks"
- ✅ Staff pick badge appears after marking
- ✅ See admin controls on all recommendation cards

## Testing Checklist

### Basic Features
- [ ] Public users can browse recommendations
- [ ] Genre filtering works for all users
- [ ] Filters stay sticky while scrolling
- [ ] Empty state shows when no recommendations match filter
- [ ] Loading state displays genre filters (no layout shift)

### Authentication
- [ ] Sign up flow works
- [ ] Sign in flow works
- [ ] User button appears when authenticated
- [ ] Sign out works

### Regular User Permissions
- [ ] Can add new recommendations via modal
- [ ] Can delete own recommendations
- [ ] Cannot delete other users' recommendations
- [ ] Cannot see staff pick controls

### Admin Permissions
- [ ] Can delete any recommendation
- [ ] Can mark recommendations as "Staff Pick"
- [ ] Can unmark "Staff Pick" status
- [ ] Staff pick badge displays correctly

### UI/UX
- [ ] Dark mode works throughout the app
- [ ] Responsive design on mobile/tablet
- [ ] Genre filters with emojis display correctly
- [ ] Sticky header stays visible while scrolling
- [ ] Smooth loading transitions when filtering

## Troubleshooting

### "Unauthorized" errors
- Verify the user is signed in
- For admin features, confirm `publicMetadata.role` is set to `"admin"` in Clerk Dashboard

### Missing user information
- Check that `CLERK_SECRET_KEY` is set in `.env.local`
- Restart the dev server after adding the key

### Convex errors
- Ensure `npx convex dev` is running
- Check that `NEXT_PUBLIC_CONVEX_URL` is set correctly

## Environment Variables Required

```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CONVEX_URL=https://...
```

## Role Management Reference

| Role | Value in Clerk | Description |
|------|---------------|-------------|
| Regular User | *no metadata* or `{}` | Can add/delete own recommendations |
| Admin | `{ "role": "admin" }` | Full control over all recommendations, can mark staff picks |

## Next Steps

After testing, consider:
1. Adding more diverse recommendations across genres
2. Testing pagination with many recommendations
3. Testing with multiple users simultaneously
4. Deploying to a staging environment

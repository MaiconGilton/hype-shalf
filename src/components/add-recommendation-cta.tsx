'use client'

import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { AddRecommendationModal } from './add-recommendation-modal'

export function AddRecommendationCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="mb-12">
        <SignedOut>
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-8 text-center">
            <div className="text-5xl mb-4">🎬</div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Share Your Favorites
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sign in to add your own movie recommendations and help others discover great films
            </p>

            <SignInButton mode="modal">
              <button className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                Sign in to add yours
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Recommendation
            </button>
          </div>
        </SignedIn>
      </div>

      <AddRecommendationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

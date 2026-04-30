'use client'

import { useState } from 'react'
import { formSchema, type FormData } from './validation'

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    feedback: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSubmitted(false)

    const result = formSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', feedback: '' })
      }
    } catch (error) {
      console.error('Submit error:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Form Prototype
          </h1>
          <p className="text-gray-600 mb-8">
            A Next.js form template for user research and rapid testing
          </p>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
              Thank you! Your feedback has been submitted.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                Feedback
              </label>
              <textarea
                id="feedback"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your thoughts..."
              />
              {errors.feedback && (
                <p className="mt-1 text-sm text-red-600">{errors.feedback}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

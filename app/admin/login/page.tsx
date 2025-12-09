/**
 * Admin Login Page
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/services/auth.service'
import { adminUIConfig } from '@/lib/admin/ui-config'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn(email, password)

    if (!result.success) {
      setError(result.error || 'Login failed')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: adminUIConfig.colors.bgMain }}
    >
      <div 
        className="w-full max-w-md p-8"
        style={{ 
          backgroundColor: adminUIConfig.colors.bgCard,
          borderRadius: adminUIConfig.layout.borderRadius,
          border: `1px solid ${adminUIConfig.colors.border}`,
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          {adminUIConfig.brand.logo ? (
            <img 
              src={adminUIConfig.brand.logo} 
              alt={adminUIConfig.brand.name}
              className="h-16 mx-auto mb-4"
            />
          ) : null}
          <h1 
            className="text-2xl font-bold"
            style={{ color: adminUIConfig.colors.textPrimary }}
          >
            {adminUIConfig.brand.name}
          </h1>
          <p 
            className="mt-2"
            style={{ color: adminUIConfig.colors.textSecondary }}
          >
            Sign in to continue
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="admin-alert admin-alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="admin-input"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="admin-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary w-full admin-btn-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="admin-spinner" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}


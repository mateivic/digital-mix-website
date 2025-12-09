/**
 * Shared Types
 * 
 * Central export for all application types.
 */

export * from './database'

// API Response types
export type ApiResponse<T> = {
  data: T | null
  error: string | null
  success: boolean
}

// Auth types
export type AuthUser = {
  id: string
  email: string
}

export type AuthSession = {
  user: AuthUser
  projectId: string
  projectSlug: string
}

// Pagination types
export type PaginationParams = {
  page?: number
  limit?: number
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Blog post form data
export type BlogPostFormData = {
  title: string
  excerpt: string
  content: string
  category: string
  readTime: number
  isPublished: boolean
  pictureFile?: File | null
}


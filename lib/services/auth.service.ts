/**
 * Auth Service
 * 
 * Server-side service for authentication operations.
 * All methods run on the server only.
 */

'use server'

import { getSupabaseActionClient, getSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { ApiResponse, AuthUser } from '@/lib/types'

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string, 
  password: string
): Promise<ApiResponse<AuthUser>> {
  try {
    const supabase = await getSupabaseActionClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    if (!data.user) {
      return { data: null, error: 'No user returned', success: false }
    }

    return { 
      data: { 
        id: data.user.id, 
        email: data.user.email! 
      }, 
      error: null, 
      success: true 
    }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    }
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<ApiResponse<null>> {
  try {
    const supabase = await getSupabaseActionClient()
    
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    return { data: null, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    }
  }
}

/**
 * Sign out and redirect to login
 */
export async function signOutAndRedirect(): Promise<void> {
  await signOut()
  redirect('/admin/login')
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<ApiResponse<AuthUser>> {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    if (!user) {
      return { data: null, error: 'Not authenticated', success: false }
    }

    return { 
      data: { 
        id: user.id, 
        email: user.email! 
      }, 
      error: null, 
      success: true 
    }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    }
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const result = await getCurrentUser()
  return result.success && result.data !== null
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth(): Promise<AuthUser> {
  const result = await getCurrentUser()
  
  if (!result.success || !result.data) {
    redirect('/admin/login')
  }

  return result.data
}

/**
 * Require admin access to current project
 */
export async function requireProjectAdmin(projectId: string): Promise<AuthUser> {
  const user = await requireAuth()
  
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('project_admins')
    .select('id')
    .eq('project_id', projectId)
    .eq('user_id', user.id)
    .single()

  if (error || !data) {
    redirect('/admin/login?error=unauthorized')
  }

  return user
}


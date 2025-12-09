/**
 * Project Service
 * 
 * Server-side service for project-related operations.
 * All methods run on the server only.
 */

'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Project, ApiResponse } from '@/lib/types'

/**
 * Get project by slug
 */
export async function getProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    return { data, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    }
  }
}

/**
 * Get project by ID
 */
export async function getProjectById(id: string): Promise<ApiResponse<Project>> {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    return { data, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    }
  }
}

/**
 * Get current project from environment
 */
export async function getCurrentProject(): Promise<ApiResponse<Project>> {
  const slug = process.env.NEXT_PUBLIC_PROJECT_SLUG
  
  if (!slug) {
    return { 
      data: null, 
      error: 'NEXT_PUBLIC_PROJECT_SLUG not configured', 
      success: false 
    }
  }

  return getProjectBySlug(slug)
}

/**
 * Check if user is admin of a project
 */
export async function isUserProjectAdmin(projectId: string): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return false

    const { data, error } = await supabase
      .from('project_admins')
      .select('id')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .single()

    return !error && !!data
  } catch {
    return false
  }
}

/**
 * Get all projects for current user
 */
export async function getUserProjects(): Promise<ApiResponse<Project[]>> {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { data: null, error: 'Not authenticated', success: false }
    }

    const { data: adminRecords, error: adminError } = await supabase
      .from('project_admins')
      .select('project_id')
      .eq('user_id', user.id)

    if (adminError) {
      return { data: null, error: adminError.message, success: false }
    }

    const projectIds = adminRecords.map(r => r.project_id)

    if (projectIds.length === 0) {
      return { data: [], error: null, success: true }
    }

    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .in('id', projectIds)

    if (projectsError) {
      return { data: null, error: projectsError.message, success: false }
    }

    return { data: projects, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    }
  }
}


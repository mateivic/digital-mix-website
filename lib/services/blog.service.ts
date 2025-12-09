/**
 * Blog Service
 * 
 * Server-side service for blog post operations.
 * All methods run on the server only.
 */

'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { 
  BlogPost, 
  BlogPostInsert, 
  BlogPostUpdate, 
  ApiResponse,
  PaginatedResponse 
} from '@/lib/types'

/**
 * Generate slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens
    .trim()
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Get all published posts for a project (public)
 */
export async function getPublishedPosts(
  projectSlug: string
): Promise<ApiResponse<BlogPost[]>> {
  try {
    const supabase = await getSupabaseServerClient()

    // First get project ID
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', projectSlug)
      .single()

    if (projectError || !project) {
      return { data: null, error: 'Project not found', success: false }
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('project_id', project.id)
      .eq('is_published', true)
      .order('created_at', { ascending: false })

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
 * Get single published post by slug (public)
 */
export async function getPublishedPostBySlug(
  projectSlug: string,
  postSlug: string
): Promise<ApiResponse<BlogPost>> {
  try {
    const supabase = await getSupabaseServerClient()

    // First get project ID
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', projectSlug)
      .single()

    if (projectError || !project) {
      return { data: null, error: 'Project not found', success: false }
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('project_id', project.id)
      .eq('slug', postSlug)
      .eq('is_published', true)
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
 * Get all posts for a project (admin - includes drafts)
 */
export async function getAllPosts(
  projectId: string,
  page: number = 1,
  limit: number = 20
): Promise<ApiResponse<PaginatedResponse<BlogPost>>> {
  try {
    const supabase = await getSupabaseServerClient()

    // Get total count
    const { count, error: countError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', projectId)

    if (countError) {
      return { data: null, error: countError.message, success: false }
    }

    const total = count || 0
    const offset = (page - 1) * limit

    // Get paginated data
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('project_id', projectId)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    return { 
      data: {
        data: data || [],
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
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
 * Get single post by ID (admin)
 */
export async function getPostById(
  postId: string
): Promise<ApiResponse<BlogPost>> {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
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
 * Create new blog post
 */
export async function createPost(
  projectId: string,
  data: {
    title: string
    excerpt?: string
    content?: string
    pictureUrl?: string
    readTime?: number
    category?: string
    isPublished?: boolean
  }
): Promise<ApiResponse<BlogPost>> {
  try {
    const supabase = await getSupabaseServerClient()

    const slug = generateSlug(data.title)

    // Check if slug exists
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('project_id', projectId)
      .eq('slug', slug)
      .single()

    const finalSlug = existing ? `${slug}-${Date.now()}` : slug

    const insertData: BlogPostInsert = {
      project_id: projectId,
      slug: finalSlug,
      title: data.title,
      excerpt: data.excerpt || null,
      content: data.content || null,
      picture_url: data.pictureUrl || null,
      read_time: data.readTime || 5,
      category: data.category || null,
      is_published: data.isPublished || false,
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    // Revalidate blog pages
    revalidatePath('/blogs')
    revalidatePath('/admin/posts')

    return { data: post, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    }
  }
}

/**
 * Update blog post
 */
export async function updatePost(
  postId: string,
  data: {
    title?: string
    excerpt?: string
    content?: string
    pictureUrl?: string
    readTime?: number
    category?: string
    isPublished?: boolean
  }
): Promise<ApiResponse<BlogPost>> {
  try {
    const supabase = await getSupabaseServerClient()

    const updateData: BlogPostUpdate = {}

    if (data.title !== undefined) {
      updateData.title = data.title
      updateData.slug = generateSlug(data.title)
    }
    updateData.excerpt = (data.excerpt !== undefined) ? data.excerpt : null
    updateData.content = (data.content !== undefined) ? data.content : null
    updateData.picture_url = (data.pictureUrl !== undefined) ? data.pictureUrl : null
    updateData.read_time = (data.readTime !== undefined) ? data.readTime : 5
    updateData.category = (data.category !== undefined) ? data.category : null
    updateData.is_published = (data.isPublished !== undefined) ? data.isPublished : false
    const { data: post, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', postId)
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    // Revalidate blog pages
    revalidatePath('/blogs')
    revalidatePath(`/blogs/${post.slug}`)
    revalidatePath('/admin/posts')

    return { data: post, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    }
  }
}

/**
 * Delete blog post
 */
export async function deletePost(postId: string): Promise<ApiResponse<null>> {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId)

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    // Revalidate blog pages
    revalidatePath('/blogs')
    revalidatePath('/admin/posts')

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
 * Toggle post publish status
 */
export async function togglePostPublish(postId: string): Promise<ApiResponse<BlogPost>> {
  try {
    const supabase = await getSupabaseServerClient()

    // Get current status
    const { data: current, error: getError } = await supabase
      .from('blog_posts')
      .select('is_published, slug')
      .eq('id', postId)
      .single()

    if (getError || !current) {
      return { data: null, error: 'Post not found', success: false }
    }

    // Toggle status
    const { data: post, error } = await supabase
      .from('blog_posts')
      .update({ is_published: !current.is_published })
      .eq('id', postId)
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    // Revalidate blog pages
    revalidatePath('/blogs')
    revalidatePath(`/blogs/${current.slug}`)
    revalidatePath('/admin/posts')

    return { data: post, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    }
  }
}


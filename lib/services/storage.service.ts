/**
 * Storage Service
 * 
 * Server-side service for file storage operations.
 * Handles image upload with automatic resizing.
 */

'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { ApiResponse } from '@/lib/types'
import sharp from 'sharp'

const BUCKET_NAME = 'blog-images'
const MAX_WIDTH = 1200
const MAX_HEIGHT = 800
const QUALITY = 80

/**
 * Process and resize image buffer
 */
async function processImage(buffer: Buffer, filename: string): Promise<Buffer> {
  const image = sharp(buffer)
  const metadata = await image.metadata()

  // Only resize if larger than max dimensions
  if (metadata.width && metadata.width > MAX_WIDTH) {
    image.resize(MAX_WIDTH, MAX_HEIGHT, {
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  // Convert to WebP for better compression, or keep original format
  const extension = filename.split('.').pop()?.toLowerCase()
  
  if (extension === 'png') {
    return image.png({ quality: QUALITY }).toBuffer()
  } else if (extension === 'gif') {
    return image.gif().toBuffer()
  } else {
    // Default to JPEG for jpg, jpeg, and other formats
    return image.jpeg({ quality: QUALITY }).toBuffer()
  }
}

/**
 * Generate a unique filename
 */
function generateFilename(originalName: string, projectId: string): string {
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg'
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `${projectId}/${timestamp}-${randomStr}.${extension}`
}

/**
 * Upload image to storage
 */
export async function uploadImage(
  formData: FormData,
  projectId: string
): Promise<ApiResponse<string>> {
  try {
    const file = formData.get('file') as File
    
    if (!file) {
      return { data: null, error: 'No file provided', success: false }
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return { data: null, error: 'Invalid file type. Use JPEG, PNG, GIF or WebP.', success: false }
    }

    // Validate file size (max 10MB before processing)
    if (file.size > 10 * 1024 * 1024) {
      return { data: null, error: 'File too large. Maximum 10MB.', success: false }
    }

    const supabase = await getSupabaseServerClient()
    
    // Convert file to buffer and process
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const processedBuffer = await processImage(buffer, file.name)
    
    // Generate unique filename
    const filename = generateFilename(file.name, projectId)

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, processedBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      return { data: null, error: uploadError.message, success: false }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename)

    return { data: urlData.publicUrl, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Upload failed', 
      success: false 
    }
  }
}

/**
 * Delete image from storage
 */
export async function deleteImage(imageUrl: string): Promise<ApiResponse<null>> {
  try {
    const supabase = await getSupabaseServerClient()
    
    // Extract path from URL
    const urlParts = imageUrl.split(`${BUCKET_NAME}/`)
    if (urlParts.length < 2) {
      return { data: null, error: 'Invalid image URL', success: false }
    }
    
    const filePath = urlParts[1]

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    return { data: null, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Delete failed', 
      success: false 
    }
  }
}

/**
 * List images for a project
 */
export async function listProjectImages(projectId: string): Promise<ApiResponse<string[]>> {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(projectId, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      return { data: null, error: error.message, success: false }
    }

    const urls = data.map(file => {
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(`${projectId}/${file.name}`)
      return urlData.publicUrl
    })

    return { data: urls, error: null, success: true }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'List failed', 
      success: false 
    }
  }
}


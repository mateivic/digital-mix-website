/**
 * Post Editor Component
 * 
 * Full post editing form with image upload and rich text editor.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminUIConfig } from '@/lib/admin/ui-config'
import { createPost, updatePost } from '@/lib/services/blog.service'
import { uploadImage } from '@/lib/services/storage.service'
import { RichTextEditor } from './rich-text-editor'
import type { BlogPost } from '@/lib/types'

interface PostEditorProps {
  projectId: string
  post?: BlogPost
}

export function PostEditor({ projectId, post }: PostEditorProps) {
  const router = useRouter()
  const isEditing = !!post

  const [title, setTitle] = useState(post?.title || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [category, setCategory] = useState(post?.category || '')
  const [readTime, setReadTime] = useState(post?.read_time || 5)
  const [pictureUrl, setPictureUrl] = useState(post?.picture_url || '')
  const [isPublished, setIsPublished] = useState(post?.is_published || false)
  
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadImage(formData, projectId)

    if (!result.success) {
      setError(result.error || 'Image upload failed')
      setUploadingImage(false)
      return
    }

    setPictureUrl(result.data || '')
    setUploadingImage(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!title.trim()) {
      setError('Title is required')
      setLoading(false)
      return
    }

    const postData = {
      title: title.trim(),
      excerpt: excerpt.trim() || undefined,
      content: content || undefined,
      pictureUrl: pictureUrl || undefined,
      readTime,
      category: category.trim() || undefined,
      isPublished,
    }

    let result

    if (isEditing && post) {
        console.log(postData)
      result = await updatePost(post.id, postData)
    } else {
      result = await createPost(projectId, postData)
    }

    if (!result.success) {
      setError(result.error || 'Failed to save post')
      setLoading(false)
      return
    }

    setSuccess(isEditing ? 'Post updated successfully!' : 'Post created successfully!')
    
    // Redirect after short delay
    setTimeout(() => {
      router.push('/admin/posts')
      router.refresh()
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Error/Success Messages */}
      {error && (
        <div className="admin-alert admin-alert-error mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}
      
      {success && (
        <div className="admin-alert admin-alert-success mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="admin-card">
            <div className="admin-form-group mb-0">
              <label className="admin-label" htmlFor="title">
                Title *
              </label>
              <input
                id="title"
                type="text"
                className="admin-input"
                placeholder="Enter post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="admin-card">
            <div className="admin-form-group mb-0">
              <label className="admin-label" htmlFor="excerpt">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                className="admin-input admin-textarea"
                placeholder="Brief description of the post..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                disabled={loading}
                rows={3}
              />
            </div>
          </div>

          {/* Content */}
          <div className="admin-card">
            <label className="admin-label">
              Content
            </label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your blog post content here..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Featured Image */}
          <div className="admin-card">
            <h3 className="font-semibold mb-4">Featured Image</h3>
            
            {pictureUrl ? (
              <div className="relative mb-4">
                <img
                  src={pictureUrl}
                  alt="Featured"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setPictureUrl('')}
                  className="absolute top-2 right-2 p-1 rounded-full"
                  style={{ backgroundColor: adminUIConfig.colors.error }}
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ) : null}
            
            <label 
              className="block w-full p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors"
              style={{ 
                borderColor: adminUIConfig.colors.border,
                color: adminUIConfig.colors.textSecondary,
              }}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={loading || uploadingImage}
              />
              {uploadingImage ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="admin-spinner" />
                  Uploading...
                </div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span className="text-sm">
                    {pictureUrl ? 'Change image' : 'Upload image'}
                  </span>
                </>
              )}
            </label>
          </div>

          {/* Category */}
          <div className="admin-card">
            <h3 className="font-semibold mb-4">Category</h3>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g., Marketing, Tips..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Read Time */}
          <div className="admin-card">
            <h3 className="font-semibold mb-4">Read Time</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="admin-input"
                min="1"
                max="60"
                value={readTime}
                onChange={(e) => setReadTime(parseInt(e.target.value) || 5)}
                disabled={loading}
              />
              <span style={{ color: adminUIConfig.colors.textSecondary }}>minutes</span>
            </div>
          </div>

          {/* Publish Settings */}
          <div className="admin-card">
            <h3 className="font-semibold mb-4">Publish</h3>
            
            <div className="flex items-center justify-between mb-4">
              <span style={{ color: adminUIConfig.colors.textSecondary }}>Status</span>
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                className={`admin-toggle ${isPublished ? 'active' : ''}`}
                disabled={loading}
              />
            </div>
            
            <p className="text-sm mb-4" style={{ color: adminUIConfig.colors.textMuted }}>
              {isPublished ? 'This post will be visible to the public.' : 'This post is saved as a draft.'}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="admin-btn admin-btn-secondary flex-1"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-btn admin-btn-primary flex-1"
                disabled={loading}
              >
                {loading ? (
                  <span className="admin-spinner" />
                ) : isEditing ? (
                  'Update'
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}


/**
 * Posts Table Component
 */

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminUIConfig } from '@/lib/admin/ui-config'
import { deletePost, togglePostPublish } from '@/lib/services/blog.service'
import type { BlogPost } from '@/lib/types'

interface PostsTableProps {
  posts: BlogPost[]
}

export function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleTogglePublish = async (postId: string) => {
    setLoadingId(postId)
    await togglePostPublish(postId)
    router.refresh()
    setLoadingId(null)
  }

  const handleDelete = async (postId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }
    
    setLoadingId(postId)
    await deletePost(postId)
    router.refresh()
    setLoadingId(null)
  }

  return (
    <div className="overflow-x-auto">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link 
                  href={`/admin/posts/${post.id}`}
                  className="font-medium hover:underline"
                  style={{ color: adminUIConfig.colors.primary }}
                >
                  {post.title}
                </Link>
                {post.excerpt && (
                  <p 
                    className="text-sm mt-1 truncate max-w-md"
                    style={{ color: adminUIConfig.colors.textMuted }}
                  >
                    {post.excerpt}
                  </p>
                )}
              </td>
              <td>
                <span style={{ color: adminUIConfig.colors.textSecondary }}>
                  {post.category || '—'}
                </span>
              </td>
              <td>
                <span className={`admin-badge ${post.is_published ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                  {post.is_published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td>
                <span style={{ color: adminUIConfig.colors.textSecondary }}>
                  {new Date(post.updated_at).toLocaleDateString()}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="admin-btn admin-btn-ghost admin-btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(post.id)}
                    disabled={loadingId === post.id}
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                  >
                    {loadingId === post.id ? (
                      <span className="admin-spinner" />
                    ) : post.is_published ? (
                      'Unpublish'
                    ) : (
                      'Publish'
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={loadingId === post.id}
                    className="admin-btn admin-btn-danger admin-btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


/**
 * Admin Posts List Page
 */

import Link from 'next/link'
import { getCurrentProject } from '@/lib/services/project.service'
import { getAllPosts } from '@/lib/services/blog.service'
import { adminUIConfig } from '@/lib/admin/ui-config'
import { PostsTable } from '@/components/admin/posts-table'

export default async function AdminPostsPage() {
  const projectResult = await getCurrentProject()
  
  if (!projectResult.data) {
    return <div>Project not found</div>
  }

  const postsResult = await getAllPosts(projectResult.data.id, 1, 100)
  const posts = postsResult.data?.data || []

  return (
    <div>
      <div className="admin-header">
        <h1>All Posts</h1>
        <Link href="/admin/posts/new" className="admin-btn admin-btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          New Post
        </Link>
      </div>

      <div className="admin-card">
        {posts.length === 0 ? (
          <div className="admin-empty">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <p>No posts yet</p>
            <Link href="/admin/posts/new" className="admin-btn admin-btn-primary admin-btn-sm mt-4">
              Create your first post
            </Link>
          </div>
        ) : (
          <PostsTable posts={posts} />
        )}
      </div>
    </div>
  )
}


/**
 * Admin Dashboard Page
 */

import Link from 'next/link'
import { getCurrentProject } from '@/lib/services/project.service'
import { getAllPosts } from '@/lib/services/blog.service'
import { adminUIConfig } from '@/lib/admin/ui-config'

export default async function AdminDashboardPage() {
  const projectResult = await getCurrentProject()
  
  if (!projectResult.data) {
    return <div>Project not found</div>
  }

  const postsResult = await getAllPosts(projectResult.data.id, 1, 100)
  
  const posts = postsResult.data?.data || []
  const publishedCount = posts.filter(p => p.is_published).length
  const draftCount = posts.filter(p => !p.is_published).length

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <Link href="/admin/posts/new" className="admin-btn admin-btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="admin-card">
          <p style={{ color: adminUIConfig.colors.textSecondary }} className="text-sm mb-1">
            Total Posts
          </p>
          <p className="text-3xl font-bold">{posts.length}</p>
        </div>
        <div className="admin-card">
          <p style={{ color: adminUIConfig.colors.textSecondary }} className="text-sm mb-1">
            Published
          </p>
          <p className="text-3xl font-bold" style={{ color: adminUIConfig.colors.success }}>
            {publishedCount}
          </p>
        </div>
        <div className="admin-card">
          <p style={{ color: adminUIConfig.colors.textSecondary }} className="text-sm mb-1">
            Drafts
          </p>
          <p className="text-3xl font-bold" style={{ color: adminUIConfig.colors.warning }}>
            {draftCount}
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="admin-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <Link 
            href="/admin/posts" 
            className="text-sm"
            style={{ color: adminUIConfig.colors.primary }}
          >
            View All →
          </Link>
        </div>

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
          <div className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}`}
                className="flex items-center justify-between p-4 rounded-lg transition-colors"
                style={{ backgroundColor: adminUIConfig.colors.bgMain }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{post.title}</p>
                  <p 
                    className="text-sm truncate mt-1"
                    style={{ color: adminUIConfig.colors.textMuted }}
                  >
                    {post.category || 'No category'} • {new Date(post.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`admin-badge ${post.is_published ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                  {post.is_published ? 'Published' : 'Draft'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


/**
 * Edit Post Page
 */

import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/services/blog.service'
import { PostEditor } from '@/components/admin/post-editor'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  
  const postResult = await getPostById(id)
  
  if (!postResult.success || !postResult.data) {
    notFound()
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Edit Post</h1>
      </div>

      <PostEditor 
        projectId={postResult.data.project_id} 
        post={postResult.data}
      />
    </div>
  )
}


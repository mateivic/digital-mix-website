/**
 * New Post Page
 */

import { getCurrentProject } from '@/lib/services/project.service'
import { PostEditor } from '@/components/admin/post-editor'

export default async function NewPostPage() {
  const projectResult = await getCurrentProject()
  
  if (!projectResult.data) {
    return <div>Project not found</div>
  }

  return (
    <div>
      <div className="admin-header">
        <h1>New Post</h1>
      </div>

      <PostEditor projectId={projectResult.data.id} />
    </div>
  )
}


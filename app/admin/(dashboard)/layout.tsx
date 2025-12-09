/**
 * Admin Dashboard Layout
 * 
 * Layout for authenticated admin pages with sidebar navigation.
 */

import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/services/auth.service'
import { getCurrentProject, isUserProjectAdmin } from '@/lib/services/project.service'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication
  const userResult = await getCurrentUser()
  
  if (!userResult.success || !userResult.data) {
    redirect('/admin/login')
  }

  // Get current project
  const projectResult = await getCurrentProject()
  
  if (!projectResult.success || !projectResult.data) {
    redirect('/admin/login?error=no_project')
  }

  // Check if user is admin of this project
  const isAdmin = await isUserProjectAdmin(projectResult.data.id)
  
  if (!isAdmin) {
    redirect('/admin/login?error=unauthorized')
  }

  return (
    <div className="admin-layout">
      <AdminSidebar 
        projectName={projectResult.data.name}
        userEmail={userResult.data.email}
      />
      <main className="admin-main">
        <AdminHeader />
        {children}
      </main>
    </div>
  )
}


/**
 * Admin Layout
 * 
 * Root layout for admin panel with authentication guard.
 */

import type { Metadata } from 'next'
import { adminCSSVariables } from '@/lib/admin/ui-config'
import './admin.css'

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Blog administration panel',
  robots: 'noindex, nofollow', // Don't index admin pages
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-root">
      <style dangerouslySetInnerHTML={{ __html: adminCSSVariables }} />
      {children}
    </div>
  )
}


/**
 * Admin Sidebar Component
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { adminUIConfig } from '@/lib/admin/ui-config'
import { signOutAndRedirect } from '@/lib/services/auth.service'

// Icons as inline SVGs for portability
const icons = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  posts: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  newPost: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  logout: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  external: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
}

interface AdminSidebarProps {
  projectName: string
  userEmail: string
}

export function AdminSidebar({ projectName, userEmail }: AdminSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: icons.dashboard },
    { href: '/admin/posts', label: 'All Posts', icon: icons.posts },
    { href: '/admin/posts/new', label: 'New Post', icon: icons.newPost },
  ]

  const handleSignOut = async () => {
    await signOutAndRedirect()
  }

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="admin-sidebar-logo">
        {adminUIConfig.brand.logo && (
          <img 
            src={adminUIConfig.brand.logo} 
            alt={adminUIConfig.brand.name}
          />
        )}
        <span>{projectName}</span>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-sidebar-link ${pathname === item.href ? 'active' : ''}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${adminUIConfig.colors.border}` }}>
          <Link
            href="/blogs"
            target="_blank"
            className="admin-sidebar-link"
          >
            {icons.external}
            View Blog
          </Link>
        </div>
      </nav>

      {/* User & Logout */}
      <div 
        className="pt-4 mt-auto"
        style={{ borderTop: `1px solid ${adminUIConfig.colors.border}` }}
      >
        <p 
          className="text-sm mb-3 truncate"
          style={{ color: adminUIConfig.colors.textMuted }}
        >
          {userEmail}
        </p>
        <button
          onClick={handleSignOut}
          className="admin-sidebar-link w-full text-left"
          style={{ color: adminUIConfig.colors.error }}
        >
          {icons.logout}
          Sign Out
        </button>
      </div>
    </aside>
  )
}


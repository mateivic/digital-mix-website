/**
 * Admin Header Component
 * 
 * Mobile header with expandable navigation for admin pages.
 */

'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { adminUIConfig } from '@/lib/admin/ui-config'
import { signOutAndRedirect } from '@/lib/services/auth.service'

// Icons
const icons = {
  menu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  posts: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  newPost: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  logout: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  external: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
}

export function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileMenuOpen])

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: icons.dashboard },
    { href: '/admin/posts', label: 'All Posts', icon: icons.posts },
    { href: '/admin/posts/new', label: 'New Post', icon: icons.newPost },
  ]

  const handleSignOut = async () => {
    await signOutAndRedirect()
  }

  return (
    <div ref={containerRef} className="lg:hidden relative">
      {/* Mobile Header Bar */}
      <header 
        className="flex items-center justify-between p-4 mb-4"
        style={{ 
          backgroundColor: adminUIConfig.colors.bgCard,
          borderRadius: adminUIConfig.layout.borderRadius,
          border: `1px solid ${adminUIConfig.colors.border}`,
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          {adminUIConfig.brand.logo && (
            <img 
              src={adminUIConfig.brand.logo} 
              alt={adminUIConfig.brand.name}
              className="h-8 w-auto"
            />
          )}
          <span className="font-semibold" style={{ color: adminUIConfig.colors.textPrimary }}>
            Admin
          </span>
        </div>

        {/* Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="admin-btn admin-btn-ghost admin-btn-sm"
        >
          {mobileMenuOpen ? icons.close : icons.menu}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          className="absolute top-20 mb-4 p-4 pr-10 animate-in slide-in-from-top-2 duration-200"
          style={{ 
            backgroundColor: adminUIConfig.colors.bgCard,
            borderRadius: adminUIConfig.layout.borderRadius,
            border: `1px solid ${adminUIConfig.colors.border}`,
          }}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href 
                    ? 'text-white' 
                    : ''
                }`}
                style={{
                  backgroundColor: pathname === item.href 
                    ? `${adminUIConfig.colors.primary}20` 
                    : 'transparent',
                  color: pathname === item.href 
                    ? adminUIConfig.colors.primary 
                    : adminUIConfig.colors.textSecondary,
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            <div 
              className="my-2" 
              style={{ borderTop: `1px solid ${adminUIConfig.colors.border}` }} 
            />

            <Link
              href="/blogs"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
              style={{ color: adminUIConfig.colors.textSecondary }}
            >
              {icons.external}
              View Blog
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left w-full"
              style={{ color: adminUIConfig.colors.error }}
            >
              {icons.logout}
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}

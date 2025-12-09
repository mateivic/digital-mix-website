/**
 * Admin Root Page
 * 
 * Redirects to dashboard or login based on auth status.
 */

import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/services/auth.service'

export default async function AdminRootPage() {
  const authenticated = await isAuthenticated()
  
  if (authenticated) {
    redirect('/admin/posts')
  } else {
    redirect('/admin/login')
  }
}


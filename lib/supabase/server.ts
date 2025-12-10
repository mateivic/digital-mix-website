/**
 * Supabase Server Client
 * 
 * Use this client for all server-side operations.
 * This properly handles cookies for authentication.
 */

import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/types/database'

/**
 * Public Supabase client for read-only operations
 * 
 * This client does NOT use cookies, making it safe for:
 * - Static page generation (generateStaticParams)
 * - Public read-only queries (published blog posts)
 * - SEO-related data fetching (sitemap, metadata)
 * 
 * DO NOT use this for authenticated operations!
 * 
 * Note: Returns untyped client - data will be typed as `any`
 * This is acceptable for public read-only queries
 */
export function getSupabasePublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/**
 * Authenticated Supabase server client
 * 
 * Use this for operations that require authentication.
 * NOTE: This uses cookies(), which makes the page dynamic.
 */
export async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  )
}

/**
 * Get Supabase client for use in Server Actions
 * This version allows setting cookies in the response
 */
export async function getSupabaseActionClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )
}

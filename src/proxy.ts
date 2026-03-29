import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname === '/maintenance'
  ) {
    return NextResponse.next()
  }

  try {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const res = await fetch(`${serverUrl}/api/globals/settings?depth=0`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    const data = await res.json()

    if (data?.maintenanceMode === true) {
      return NextResponse.rewrite(new URL('/maintenance', request.url))
    }
  } catch {
    // En cas d'erreur, on laisse passer
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|logo|og|robots|sitemap).*)'],
}

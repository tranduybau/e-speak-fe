import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { i18n } from './dictionaries/i18n-config'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value
  })

  const locales: string[] = [...i18n.locales]

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

const privatePaths = ['/']
const unAuthPaths = ['/login', 'register']

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isLogin = Boolean(request.cookies.get('access_token')?.value)

  const locale = i18n.locales.find((loc) => pathname.startsWith(`/${loc}`))
  const pathWithoutLocale = locale ? pathname.replace(`/${locale}`, '') || '/' : pathname

  if (['/robots.txt', '/favicon.ico'].includes(pathname)) return NextResponse.next()

  const pathnameIsMissingLocale = i18n.locales.every(
    (loc) => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`,
  )

  if (pathnameIsMissingLocale) {
    const detectedLocale = getLocale(request)
    return NextResponse.redirect(
      new URL(
        `/${detectedLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}${search}`,
        request.url,
      ),
    )
  }

  if (isLogin && unAuthPaths.includes(pathWithoutLocale)) {
    return NextResponse.redirect(new URL(`/${locale || i18n.defaultLocale}/`, request.url))
  }

  if (!isLogin && privatePaths.includes(pathWithoutLocale)) {
    return NextResponse.redirect(new URL(`/${locale || i18n.defaultLocale}/login`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|svg|image).*)'],
}

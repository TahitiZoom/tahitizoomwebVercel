'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

export default function HomePageClient({
  children,
}: {
  children: (t: (key: string) => string) => React.ReactNode
}) {
  const { t } = useLocale()
  return <>{children(t)}</>
}

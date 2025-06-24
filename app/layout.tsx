'use client'

import { cn } from '@/lib/utils'
import '@mantine/tiptap/styles.css'
import NoSSRReduxProvider from '@/features/NoSSRReduxProvider'
import { Providers } from './Providers'

import '@/styles/tailwind.css'
import { RootLayout } from '@/layouts/RootLayout'

export default function DashboardXLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <Providers>
          <NoSSRReduxProvider>
            <RootLayout>{children}</RootLayout>
          </NoSSRReduxProvider>
        </Providers>
      </body>
    </html>
  )
}

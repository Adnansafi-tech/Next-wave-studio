'use client'

import { Container } from '@/components/Container'
import { DashboardComponents } from '@/components/dashboard-components'
import FlashMessage from '@/components/flash-message'
import { withAuth } from '@/components/with-auth'

function Dashboard() {
  return (
    <div className="relative z-10 min-h-screen overflow-hidden">
      <FlashMessage />
      <div className="pointer-events-none absolute inset-x-0 h-[100vh] w-full scale-[1.1] bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black" />
      <Container className="z-50 min-h-screen">
        <DashboardComponents />
      </Container>
    </div>
  )
}

export default withAuth(Dashboard)

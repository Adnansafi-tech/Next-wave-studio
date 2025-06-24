'use client'

import React, { useState } from 'react'
import { SidebarDashboard } from './sidebar-dashboard'
import DashboardForm from './dashboard-form'

export type ComponentKey = keyof typeof components

const components = {
  blog: () => {
    return <DashboardForm />
  },
}

export const DashboardComponents = () => {
  const [selectedLink, setSelectedLink] = useState<ComponentKey>('blog')

  const SelectedComponent = components[selectedLink]

  return (
    <div className="z-50 overflow-scroll p-4">
      <SidebarDashboard
        className="fixed z-20 lg:fixed"
        setSelectedLink={setSelectedLink}
        selectedLink={selectedLink}
      />
      <div className="relative z-30 float-right w-[80%] overflow-scroll">
        <SelectedComponent />
      </div>
    </div>
  )
}

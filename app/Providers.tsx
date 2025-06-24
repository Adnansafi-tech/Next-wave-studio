'use client'

import MantineProviderWrapper from './MantineProviderWrapper'

export function Providers({ children }: { children: React.ReactNode }) {
  return <MantineProviderWrapper>{children}</MantineProviderWrapper>
}

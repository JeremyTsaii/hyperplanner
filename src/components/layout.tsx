import React, { useEffect } from 'react'
import { initGA, logPageView } from '../utils/googleAnalytics'

declare global {
  interface Window {
    GA_INITIALIZED: boolean
  }
}

interface IProps {
  children: React.ReactNode
}

function Layout({ children }: IProps): JSX.Element {
  useEffect((): void => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  })

  return <div>{children}</div>
}

export default Layout

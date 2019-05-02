import Shell from '../lib/ui/Shell'
import JoinChannel from '../lib/join/JoinChannel'
import ErrorBoundary from '../lib/ui/ErrorBoundary'
import React from 'react'

export default () => (
  <ErrorBoundary>
    <Shell visibleOnMobile={false}>
      <JoinChannel />
    </Shell>
  </ErrorBoundary>
)

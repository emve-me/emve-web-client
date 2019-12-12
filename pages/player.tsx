import { Component } from 'react'
import PlayerMain from '../lib/player/PlayerMain'
import { useRouter } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'

const Player = () => {
  const router = useRouter()

  return (
    <ErrorBoundary>
      <PlayerMain channel={router.query.p as string} />
    </ErrorBoundary>
  )
}

export default Player

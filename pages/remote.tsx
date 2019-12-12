import React, { createRef, Component } from 'react'
import RemoteMain from '../lib/remote/RemoteMain'
import { useRouter } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'
import LoginAndJoin from '../lib/remote/LoginAndJoin'
import { useLoggedInUser } from '../lib/consumers/useLoggedInUser'

const Remote = () => {
  const router = useRouter()
  const { loggedIn } = useLoggedInUser()

  const { p: channel } = router.query

  return (
    <ErrorBoundary>
      {loggedIn ? <RemoteMain channel={channel as string} /> : <LoginAndJoin />}
    </ErrorBoundary>
  )
}

export default Remote

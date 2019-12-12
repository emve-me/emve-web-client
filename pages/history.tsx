import React from 'react'
import { useRouter } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'
import LoginAndJoin from '../lib/remote/LoginAndJoin'
import History from '../lib/history/History'
import { useLoggedInUser } from '../lib/consumers/useLoggedInUser'

const HistoryPage = () => {
  const router = useRouter()
  const { loggedIn } = useLoggedInUser()

  const { p: channel } = router.query

  return (
    <ErrorBoundary>
      {loggedIn ? <History channel={channel as string} /> : <LoginAndJoin />}
    </ErrorBoundary>
  )
}

export default HistoryPage

import Shell from '../Shell'
import Login from '../Login'
import HeartIcon from '../icons/HeartIcon'
import React from 'react'

export default () => (
  <Shell visibleOnMobile={false}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div style={{ padding: 25 }}>
        <HeartIcon />
      </div>
      <h1 style={{ paddingBottom: 25 }}>You're party awaits!</h1>

      <Login />
    </div>
  </Shell>
)

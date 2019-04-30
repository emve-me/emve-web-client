import LoggedInUserController from './consumers/LoggedInUserController'
import React from 'react'
import { deleteCookie } from 'vanilla-cookies'

export default ({
  style,
  thumbSize = 40
}: {
  thumbSize?: number | string
  style?: React.CSSProperties
}) => (
  <div style={style}>
    <LoggedInUserController>
      {({ user, loggedIn, logout }) => (
        <div>
          {loggedIn ? (
            <div>
              <img
                onClick={logout}
                style={{
                  borderRadius: 100,
                  border: 'solid 2px #ff2f7f',
                  width: thumbSize,
                  cursor: 'pointer'
                }}
                src={user.picture}
              />
            </div>
          ) : (
            false
          )}{' '}
        </div>
      )}
    </LoggedInUserController>
  </div>
)

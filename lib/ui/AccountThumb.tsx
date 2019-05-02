import LoggedInUserController from '../consumers/LoggedInUserController'
import React from 'react'
import { deleteCookie } from 'vanilla-cookies'
import { accentColor } from '../style/colors'

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
                  border: `solid 2px ${accentColor}`,
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

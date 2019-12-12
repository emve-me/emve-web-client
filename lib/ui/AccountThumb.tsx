import React from 'react'
import { accentColor } from '../style/colors'
import { logout, useLoggedInUser } from '../consumers/useLoggedInUser'

export default ({
  style,
  thumbSize = 40
}: {
  thumbSize?: number | string
  style?: React.CSSProperties
}) => {
  const { loggedIn, user } = useLoggedInUser()

  return (
    <div style={style}>
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
    </div>
  )
}

import LoggedInUserController from './consumers/LoggedInUserController'
import React from 'react'
import { deleteCookie } from 'vanilla-cookies'

export default ({ style, thumbSize = 40 }: { thumbSize?: number | string, style?: React.CSSProperties }) => <div
  style={style}>
  <LoggedInUserController>
    {({ user, loggedIn }) => <div>{loggedIn ?
      <div><img onClick={() => {
        deleteCookie('GTOKENID')
        window.location.href = '/'
      }} style={{ borderRadius: 100, width: thumbSize }} src={user.picture}/></div> : false}       </div>}
  </LoggedInUserController>
</div>

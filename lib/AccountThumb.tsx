import LoggedInUserController from './consumers/LoggedInUserController'
import React from 'react'
import { deleteCookie } from 'vanilla-cookies'

export default () => <div style={{ position: 'fixed', right: 20, top: 10, zIndex: 100 }}>
  <LoggedInUserController>
    {({ user, loggedIn }) => <div>{loggedIn ?
      <div><img onClick={() => {
        deleteCookie('GTOKENID')
        window.location.href = '/'
      }} style={{ borderRadius: 100, width: 40 }} src={user.picture}/></div> : false}       </div>}
  </LoggedInUserController>
</div>

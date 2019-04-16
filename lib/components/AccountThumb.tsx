import LoggedInUserConsumer from './LoggedInUserConsumer'
import React from 'react'
import { deleteCookie } from '../util/cookie'

export default () => <div style={{ position: 'fixed', right: 20, top: 10, zIndex: 100 }}>
  <LoggedInUserConsumer>
    {({ user, loggedIn }) => <div>{loggedIn ?
      <div><img onClick={() => {

        deleteCookie('GTOKENID')
        window.location.href = '/'
      }} style={{ borderRadius: 100, width: 40 }} src={user.picture}/></div> : false}       </div>}
  </LoggedInUserConsumer>
</div>
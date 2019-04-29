import React, { Component } from 'react'
import Login from '../Login'
import Shell from '../Shell'
import MobileIcon from '../icons/MobileIcon'
import TVIcon from '../icons/TVIcon'
import MobileOutlineIcon from '../icons/MobileOutlineIcon'

type TInfoProps = {
  className: string
}

const PlayerInfo = ({ className }: TInfoProps) => (
  <div className={className}>
    <TVIcon size={150} />
    <h2>Setup the big screen as the player</h2>
  </div>
)

const RemoteInfo = ({ className }: TInfoProps) => (
  <div className={className}>
    <div
      style={{ display: 'flex', width: 400, justifyContent: 'space-between' }}>
      <MobileOutlineIcon size={100} />
      <MobileOutlineIcon size={100} />
      <MobileOutlineIcon size={100} />
    </div>
    <h2>Friends DJ using their phone</h2>
  </div>
)

export default class LoginSplash extends Component {
  render() {
    return (
      <Shell>
        {/*language=CSS*/}
        <style jsx>
          {`
            .container {
              padding-top: 50px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            h2,
            h3 {
              padding: 25px 0;
            }

            h1 {
              padding-bottom: 50px;
            }

            @media only screen and (max-width: 905px) {
              .container {
              }
            }
          `}
        </style>
        {/*language=CSS*/}
        <style jsx global>
          {`
            .info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>

        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>A social video jukebox</h1>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <PlayerInfo className="info" />

            <div style={{ width: 50 }} />
            <RemoteInfo className="info" />
          </div>
          <h3>Sign in to get started</h3>
          <Login />
        </div>
        <div
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            display: 'flex',
            paddingBottom: 16
          }}>
          A personal project / experiment by&nbsp;<a href="">Robert Lancer</a>
        </div>
      </Shell>
    )
  }
}

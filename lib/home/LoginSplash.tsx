import React, { Component } from 'react'
import Login from '../Login'
import Shell from '../Shell'
import MobileIcon from '../icons/MobileIcon'
import TVIcon from '../icons/TVIcon'
import MobileOutlineIcon from '../icons/MobileOutlineIcon'

type TInfoProps = {
  className: string
}

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

            h3 {
              padding: 25px 0;
            }

            h2 {
              padding-top: 25px;
            }

            h1 {
              padding-bottom: 50px;
            }

            .info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            @media only screen and (max-width: 905px) {
              .container {
              }
            }
          `}
        </style>

        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>A social video jukebox</h1>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className="info">
              <TVIcon size={150} />
              <h2>Setup the big screen as the player</h2>
            </div>

            <div style={{ width: 50 }} />

            <div className="info">
              <div
                style={{
                  display: 'flex',
                  width: 330,
                  justifyContent: 'space-between'
                }}>
                <MobileOutlineIcon size={110} />
                <MobileOutlineIcon size={110} />
                <MobileOutlineIcon size={110} />
              </div>
              <h2>Friends DJ using their phone</h2>
            </div>
          </div>

          <div
            style={{
              paddingTop: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <div style={{ paddingBottom: 15 }}>Sign in to get started</div>
            <Login />
          </div>
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

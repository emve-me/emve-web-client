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

            h2 {
              padding-top: 25px;
            }

            h1 {
              padding-bottom: 50px;
            }

            .infoContainer {
              display: flex;
              align-items: flex-end;
            }

            .spacer {
              width: 50px;
            }

            .info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            .mobile {
              display: none;
            }

            .desktop {
              display: block;
            }

            @media only screen and (max-width: 905px) {
              h2 {
                padding-top: 0px;
                padding-bottom: 16px;
              }

              h1 {
                padding-bottom: 16px;
              }

              .spacer {
                height: 25px;
              }

              .infoContainer {
                flex-direction: column;
              }

              .desktop {
                display: none;
              }

              .mobile {
                display: block;
              }
            }
          `}
        </style>

        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>A social video jukebox</h1>

          <div className="infoContainer">
            <div className="info">
              <h2 className="mobile">Use the big screen as the player</h2>
              <TVIcon size={150} />
              <h2 className="desktop">Use the big screen as the player</h2>
            </div>

            <div className="spacer" />

            <div className="info">
              <h2 className="mobile">Friends DJ using their phone</h2>
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
              <h2 className="desktop">Friends DJ using their phone</h2>
            </div>
          </div>

          <div
            style={{
              paddingTop: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Login />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            display: 'flex',
            padding: '16px 0'
          }}>
          A personal project / experiment by&nbsp;<a href="">Robert Lancer</a>
        </div>
      </Shell>
    )
  }
}

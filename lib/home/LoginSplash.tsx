import React, { Component } from 'react'
import Login from '../ui/Login'
import Shell from '../ui/Shell'
import TVIcon from '../icons/TVIcon'
import MobileOutlineIcon from '../icons/MobileOutlineIcon'
import HeartIcon from '../icons/HeartIcon'

const LoginSplash: React.FC = () => {
  return (
    <Shell visibleOnMobile={false}>
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

          .login {
            padding-top: 50px;
          }

          .logo {
            display: none;
          }

          .footer {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            padding: 62px 0 26px 0;
          }

          @media only screen and (max-width: 905px) {
            .container {
              padding-top: 25px;
            }
            h2 {
              padding-top: 0px;
              padding-bottom: 16px;
            }

            h1 {
              padding: 16px 0;
            }

            .spacer {
              height: 25px;
            }

            .infoContainer {
              flex-direction: column;
              align-items: center;
            }

            .desktop {
              display: none;
            }

            .mobile {
              display: block;
            }

            .login {
              padding-top: 25px;
            }

            .logo {
              display: block;
            }

            .footer {
              position: static;
              display: flex;
              justify-content: center;
              padding: 62px 0 26px 0;
            }
          }
        `}
      </style>

      <div className="container">
        <div className="logo">
          <HeartIcon />
        </div>
        <h1>A social video jukebox</h1>

        <div className="infoContainer">
          <div className="info">
            <h2 className="mobile">Use the big screen as the player</h2>
            <TVIcon size={150} />
            <h2 className="desktop">Use the big screen as the player</h2>
          </div>

          <div className="spacer" />

          <div className="info">
            <h2 className="mobile">Friends DJ using their phones</h2>
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
            <h2 className="desktop">Friends DJ using their phones</h2>
          </div>
        </div>

        <div className="login">
          <Login />
        </div>
      </div>
      <div className="footer">&copy; {new Date().getFullYear()} emve.me</div>
    </Shell>
  )
}

export default LoginSplash

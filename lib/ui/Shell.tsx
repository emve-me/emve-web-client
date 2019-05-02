import React, { Component } from 'react'
import AccountThumb from './AccountThumb'
import HeartIcon from '../icons/HeartIcon'
import Link from 'next/link'

type TProps = {
  header?: React.ReactNode
  visibleOnMobile?: boolean
  logoVisibleOnMobile?: boolean
}

export default class Shell extends Component<TProps> {
  static defaultProps = {
    visibleOnMobile: true,
    logoVisibleOnMobile: true
  }

  render() {
    const { visibleOnMobile, logoVisibleOnMobile } = this.props

    return (
      <>
        {/*language=CSS*/}
        <style jsx>
          {`
            header {
              border-bottom: solid 1px rgba(0, 0, 0, 0.25);
              background-color: white;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0px 14px;
              position: fixed;
              top: 0;
              right: 0;
              left: 0;
              height: 70px;
            }

            .bodyContainer {
              padding-top: 70px;
              flex: 1;
              display: flex;
              flex-direction: column;
            }

            .logo {
              display: block;
            }

            @media only screen and (max-width: 905px) {
              header {
                display: ${visibleOnMobile ? 'flex' : 'none'};
                height: 60px;
              }

              .logo {
                display: ${logoVisibleOnMobile ? 'block' : 'none'};
              }

              .bodyContainer {
                padding-top: ${visibleOnMobile ? '60px' : '0'};
              }
            }
          `}
        </style>

        <header>
          <Link href="/">
            <div className="logo">
              <HeartIcon style={{ cursor: 'pointer' }} size={30} />
            </div>
          </Link>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {this.props.header}
          </div>

          <AccountThumb thumbSize={33} />
        </header>
        <div className="bodyContainer">{this.props.children}</div>
      </>
    )
  }
}

import React, { Component } from 'react'
import Link from 'next/link'
import { appBackgroundColor } from '../lib/style/colors'

export default class Error extends Component<{ statusCode: number }> {
  static getInitialProps({ res, err }: { res: any; err: any }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  get message() {
    const { statusCode } = this.props

    switch (statusCode) {
      case null:
        return `Unknown error.`
      case 404:
        return `Sorry, couldn't find what you're looking for.`
      default:
        return `An error ${statusCode} occurred.`
    }
  }

  render() {
    return (
      <div className="root">
        {/*language=CSS*/}
        <style jsx>
          {`
            body {
              background-color: ${appBackgroundColor};
            }

            h1 {
              text-align: center;
              padding: 0 16px 16px 16px;
            }

            a {
              text-decoration: underline;
            }

            .root {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }

            .brokeHeart {
              padding-top: 50px;
              padding-bottom: 50px;
            }

            @media only screen and (max-width: 905px) {
              .brokeHeart {
                padding-top: 25px;
                padding-bottom: 25px;
              }
            }
          `}
        </style>

        <img
          className="brokeHeart"
          style={{ width: 200 }}
          src="/broken_heart.svg"
        />

        <h1>{this.message}</h1>
        <Link href="/">
          <a>Take me home!</a>
        </Link>
      </div>
    )
  }
}

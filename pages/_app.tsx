import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/withApollo'
import { ApolloClient } from 'apollo-client'
import {
  accentColor,
  appBackgroundColor,
  linkColor,
  textColor
} from '../lib/style/colors'
import getConfig from 'next/config'

type PROPS = {
  apollo: ApolloClient<any>
}

const { staticPath, baseUrl } = getConfig().publicRuntimeConfig

class MyApp extends App<PROPS> {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <>
        <Head>
          <title>emve.me</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content={accentColor} />
          <meta name="theme-color" content={accentColor} />
          <meta property="og:image" content={`${staticPath}/ogimage.png`} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={baseUrl} />
          <meta property="og:title" content="emve.me" />

          <meta
            property="og:description"
            content="A social video jukebox, queue your favorite music videos with your friends."
          />

          <meta
            name="description"
            content="A social video jukebox, queue your favorite music videos with your friends."
          />
        </Head>

        {/*language=CSS*/}
        <style jsx global>{`
          body {
            color: ${textColor};
            font-weight: 400;
            word-wrap: break-word;
            margin: 0;
            padding: 0;
            overflow-y: auto;
            height: 100%;
            background-color: ${appBackgroundColor};
          }

          #__next {
            height: 100%;
          }

          h1 {
            font-size: 40px;
            font-weight: normal;
            margin: 0;
          }

          h2 {
            font-size: 30px;
            font-weight: normal;
            margin: 0;
          }

          h3 {
            font-size: 20px;
            font-weight: normal;
            margin: 0;
          }

          @media only screen and (max-width: 905px) {
            h1 {
              font-size: 30px;
            }

            h2 {
              font-size: 20px;
            }
          }

          html {
            height: 100%;
            box-sizing: border-box;
          }

          img,
          svg {
            border: 0;
            line-height: 0;
            display: block;
            outline: none;
          }

          textarea {
            display: block;
          }

          html,
          body,
          input,
          button,
          textarea {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif !important;
            color: ${textColor};
          }

          a {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            text-decoration: none;
            outline: none;
            color: ${linkColor};
            cursor: pointer;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
        `}</style>

        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    )
  }
}

export default withApollo(MyApp)

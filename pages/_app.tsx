import React from 'react'
import App, { Container } from 'next/app'

import Head from 'next/head'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/withApollo'
import { ApolloClient } from 'apollo-client'

type PROPS = {
  apollo: ApolloClient<any>
}

class MyApp extends App<PROPS> {


  componentDidMount() {
  }

  render() {
    const { Component, pageProps, apollo } = this.props

    const textColor = '#222'

    return (
      <Container>
        <Head>
          <title>emve.me</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
          <link rel="manifest" href="/static/site.webmanifest"/>
          <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5"/>
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>

        { /*language=CSS*/}
        <style jsx global>{`
          body {
            color: ${textColor};
            font-weight: 400;
            word-wrap: break-word;
            margin: 0;
            padding: 0;
            overflow-y: auto;
            height: 100%;
            background-color: #fAFAFA;
          }
          
          #__next {
            height: 100%;
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
            color: dodgerblue;
          }
          
          *, *:before, *:after {
            box-sizing: inherit;
          } 

        `}</style>

        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)

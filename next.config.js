const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    isProd: process.env.NODE_ENV === 'production',
    graphQLEndpoint:
      process.env.NODE_ENV === 'production'
        ? 'https://cribble.co/graphql'
        : 'http://localhost:3000/graphql'
  }
})

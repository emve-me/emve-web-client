const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
  serverRuntimeConfig: {
    // Will only be available on the server side

    graphQLEndpoint: 'http://localhost:4000'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    isProd: process.env.NODE_ENV === 'production',
    graphQLEndpoint: 'http://localhost:4000'
  }
})

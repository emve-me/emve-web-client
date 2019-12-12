if (!process.env.NODE_ENV === 'production') {
  require('dotenv').config()
}

module.exports = {
  serverRuntimeConfig: {
    graphQLEndpoint: process.env.GRAPHQL_ENDPOINT_SERVER
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    isProd: process.env.NODE_ENV === 'production',
    graphQLEndpoint: process.env.GRAPHQL_ENDPOINT_CLIENT,
    graphQLSubscription: process.env.GRAPHQL_SUBSCRIPTION_ENDPOINT,
    baseUrl: process.env.BASE_URL,
    staticPath: process.env.BASE_URL,
    oAuthClientId: process.env.OAUTH_CLIENT_ID,
    youtubeSearchKey: process.env.YOUTUBE_SEARCH_KEY
  }
}

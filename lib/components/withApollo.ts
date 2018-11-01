import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { ApolloClient } from 'apollo-client'
// import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'
import { getCookie } from '../util/cookie'

export default withApollo(({ headers, initialState, ctx }) => {
  const gqlEndpoint = process.browser
    ? getConfig().publicRuntimeConfig.graphQLEndpoint
    : getConfig().serverRuntimeConfig.graphQLEndpoint

  console.log('connecting to', gqlEndpoint)

  const httpLink = createHttpLink({
    uri: gqlEndpoint
  })

  const authLink = setContext((_, ___) => {
    const getGQLHeaders = (cookieString: string) => {
      const sessionToken = getCookie('COLLAB_SESSION', cookieString)

      const headersForRequest: any = {}

      if (sessionToken) {
        headersForRequest.authorization = `Bearer ${sessionToken}`
      }

      return { headers: headersForRequest }
    }

    if (process.browser) {
      return getGQLHeaders(window.document.cookie)
    } else {
      return headers
        ? typeof headers.cookie === 'string'
          ? getGQLHeaders(headers.cookie)
          : {}
        : {}
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
})

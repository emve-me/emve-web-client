import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'
import jwtIO from 'jsonwebtoken'
import { LOGGED_IN_USER } from './gql'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { getCookie } from 'vanilla-cookies'


export default withApollo(({ headers, initialState, ctx }) => {

  const gqlEndpoint = process.browser
    ? getConfig().publicRuntimeConfig.graphQLEndpoint
    : getConfig().serverRuntimeConfig.graphQLEndpoint

  const httpLink = createHttpLink({
    uri: gqlEndpoint
  })

  // TODO MAKE SURE STATE IS PROPER HYDRATED
  console.log('initialState', initialState)

  const getJWTFromCookieString = (cookieString: string) => getCookie('GTOKENID', cookieString)

  const getGQLHeaders = (cookieString: string) => {

    const sessionToken = getJWTFromCookieString(cookieString)

    const headersForRequest: any = {}

    if (sessionToken) {
      headersForRequest.authorization = `Bearer ${sessionToken}`
    }

    return { headers: headersForRequest }
  }

  const authLink = setContext((_, ___) => {
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


  const getCache = () => {
    const cache = new InMemoryCache({
      dataIdFromObject: object => {
        switch (object.__typename) {
          case 'SearchResult':
            return (object as any).id.videoId
        }

        return object.id
      }
    })


    if (headers && typeof headers.cookie === 'string') {
      const jwt = getJWTFromCookieString(headers.cookie)

      if (jwt) {
        const decoded = jwtIO.decode(jwt) as TJWT

        const loggedInUser = {
          ...decoded,
          id: 'LoggedInUser',
          __typename: 'User'
        }

        cache.writeQuery({
          query: LOGGED_IN_USER,
          data: { loggedInUser }
        })

        return cache
      }
    }
    return cache
  }

  const authHttpLink = authLink.concat(httpLink)

  const getLink = () => process.browser ? split(
    // split based on operation type
    ({ query }) => {
      const mainDef = getMainDefinition(query)
      const { kind, operation } = mainDef as any
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    new WebSocketLink({
      uri: `ws://localhost:4000/graphql`,
      options: {
        reconnect: true
      }
    }),
    authHttpLink
  ) : authHttpLink

  if (process.browser && process.env.NODE_ENV !== 'production') {
    const jwt = getJWTFromCookieString(window.document.cookie)

    if (jwt) {
      console.log(`"authorization": "Bearer ${jwt}"`)
    }

  }

  return new ApolloClient({
    link: getLink(),
    cache:
      getCache()
  })
}, { getDataFromTree: 'ssr' })

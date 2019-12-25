import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { getCookie } from 'vanilla-cookies'

const isBrowser = typeof window !== 'undefined'

const config = getConfig()
const gqlEndpoint = isBrowser
  ? config.publicRuntimeConfig.graphQLEndpoint
  : config.serverRuntimeConfig.graphQLEndpoint

const gqlSubscription = config.publicRuntimeConfig.graphQLSubscription

export default withApollo(
  ({ headers, initialState, ctx }) => {
    const httpLink = createHttpLink({
      uri: gqlEndpoint
    })

    const getJWTFromCookieString = (cookieString: string) =>
      getCookie('GTOKENID', cookieString)

    const getGQLHeaders = (cookieString: string) => {
      const sessionToken = getJWTFromCookieString(cookieString)

      const headersForRequest: any = {}

      if (sessionToken) {
        headersForRequest.authorization = `Bearer ${sessionToken}`
      }

      return { headers: headersForRequest }
    }

    const authLink = setContext((_, ___) => {
      if (isBrowser) {
        return getGQLHeaders(window.document.cookie)
      } else {
        return headers
          ? typeof headers.cookie === 'string'
            ? getGQLHeaders(headers.cookie)
            : {}
          : {}
      }
    })

    const authHttpLink = authLink.concat(httpLink)

    const getLink = () =>
      isBrowser
        ? split(
            // split based on operation type
            ({ query }) => {
              const mainDef = getMainDefinition(query)
              const { kind, operation } = mainDef as any
              return (
                kind === 'OperationDefinition' && operation === 'subscription'
              )
            },
            new WebSocketLink({
              uri: gqlSubscription,
              options: {
                reconnect: true
              }
            }),
            authHttpLink
          )
        : authHttpLink

    if (isBrowser && process.env.NODE_ENV !== 'production') {
      const jwt = getJWTFromCookieString(window.document.cookie)

      if (jwt) {
        console.log(`"authorization": "Bearer ${jwt}"`)
      }
    }

    return new ApolloClient({
      assumeImmutableResults: true,
      link: getLink(),
      cache: new InMemoryCache({
        freezeResults: true,
        dataIdFromObject: object => {
          switch (object.__typename) {
            case 'SearchResult':
              return (object as any).id.videoId
          }

          return object.id
        }
      }).restore(initialState || {})
    })
  },
  { getDataFromTree: 'always' } // changed to always, not sure its needed
)

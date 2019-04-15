import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'
import { getCookie } from '../util/cookie'
import jwtIO from 'jsonwebtoken'

export default withApollo(({ headers, initialState, ctx }) => {


  const gqlEndpoint = process.browser
    ? getConfig().publicRuntimeConfig.graphQLEndpoint
    : getConfig().serverRuntimeConfig.graphQLEndpoint


  const httpLink = createHttpLink({
    uri: gqlEndpoint
  })


  const getJWTFromCookieString = (cookieString: string) => getCookie('GTOKENID', cookieString)

  const getGQLHeaders = (cookieString: string) => {

    const sessionToken = getJWTFromCookieString(cookieString)
    console.log('SESSION OTKEN', sessionToken)

    const headersForRequest: any = {}

    if (sessionToken) {
      headersForRequest.authorization = `Bearer ${sessionToken}`
    }

    return { headers: headersForRequest }
  }


  const authLink = setContext((_, ___) => {
    console.log('in Auth Link')

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

    if (headers && typeof headers.cookie === 'string') {
      const jwt = getJWTFromCookieString(headers.cookie)

      if (jwt) {

        const decoded = jwtIO.decode(jwt)

        return new InMemoryCache().restore(({ data: { user: decoded } }))

      }
    }

    return new InMemoryCache()
  }

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: getCache()
  })
}, { getDataFromTree: 'ssr' })

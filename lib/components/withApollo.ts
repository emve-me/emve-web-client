import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'
import { getCookie } from '../util/cookie'
import jwtIO from 'jsonwebtoken'
import { gql } from 'apollo-boost'


type TJWT = {
  iss
  azp
  aud
  sub
  email
  email_verified
  at_hash
  name
  picture
  given_name
  family_name
  locale
  iat
  exp
  jti
}

export const QQ = gql`query ReadUser {
  loggedInUser {
    iss
    azp
    aud
    sub
    email
    email_verified
    at_hash
    name
    picture
    given_name
    family_name
    locale
    iat
    exp
    jti
    id
    __typename
  }
}`

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


        const decoded = jwtIO.decode(jwt) as TJWT

        const loggedInUser = {
          ...decoded,
          id: 'LoggedInUser',
          __typename: 'User'
        }
        const cache = new InMemoryCache()


        cache.writeQuery({
          query: QQ,
          data: { loggedInUser}
        })


        return cache

      }
    }

    return new InMemoryCache()
  }

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: getCache()
  })
}, { getDataFromTree: 'ssr' })

import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'

const setAuthorizationLink = setContext((request, previousContext) => {
  if (process.browser) {
  } else {
    console.log('running query on server')
    return {}
  }
})

export default withApollo(
  ({ headers }) => {
    const cache = new InMemoryCache({})

    const defaults = (() => {
      if (process.browser) {
      }

      return null
    })()

    const stateLink = withClientState({
      cache,
      resolvers: {
        Mutation: {}
      },
      defaults
    })

    const gqlEndpoint = getConfig().publicRuntimeConfig.graphQLEndpoint

    const linkHttp = createHttpLink({
      uri: gqlEndpoint
    })

    return new ApolloClient({
      link: ApolloLink.from([stateLink, setAuthorizationLink, linkHttp]),
      cache
    })
  },
  { getDataFromTree: 'never' }
)

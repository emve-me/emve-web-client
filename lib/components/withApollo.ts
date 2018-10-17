import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'


export default withApollo(
  ({ headers }) => {
    const gqlEndpoint = getConfig().publicRuntimeConfig.graphQLEndpoint
    return new ApolloClient({ uri: gqlEndpoint, credentials: 'include' })
  }
)

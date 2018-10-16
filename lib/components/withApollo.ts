import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'


export default withApollo(
  ({ headers }) => {
    const cache = new InMemoryCache({})



    const gqlEndpoint = getConfig().publicRuntimeConfig.graphQLEndpoint

    const linkHttp = createHttpLink({
      uri: gqlEndpoint,
      credentials: 'include'
    })

    return new ApolloClient({
      link: linkHttp,
      cache
    })
  }
)

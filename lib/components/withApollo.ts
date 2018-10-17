import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'


export default withApollo(
  ({ headers, initialState, ctx }) => {

    console.log({ initialState })


    const gqlEndpoint = getConfig().publicRuntimeConfig.graphQLEndpoint


    if (headers) {

      // read the cookie out and attach it to the autherization header

      return new ApolloClient({ uri: gqlEndpoint, headers: { cookie: headers.cookie } })
    }
    else {
      return new ApolloClient({ uri: gqlEndpoint, credentials: 'include' })
    }
  }
)

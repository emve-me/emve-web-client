import React, { Component } from 'react'
import { withApollo, WithApolloClient } from 'react-apollo'
import Router from 'next/router'
import { CreateChannel, CreateChannelVariables } from '../../../gql_types/CreateChannel'
import gql from 'graphql-tag'

const CREATE_CHANNEL = gql`
  mutation CreateChannel($channelName: String) {
    channelCreate(input: { channelName: $channelName })
  }
`

type TChildren = {
  createParty: () => Promise<void>
}

type TProps = {
  children: ({ createParty }: TChildren) => React.ReactNode
}

class CreateChannelController extends Component <WithApolloClient<TProps>> {

  render() {
    const { children, client } = this.props

    return children({
      createParty: async () => {
        const resp = await client.mutate<CreateChannel, CreateChannelVariables>({ mutation: CREATE_CHANNEL })
        Router.push({ pathname: '/player', query: { p: resp.data.channelCreate } })
      }
    })
  }
}

export default withApollo<TProps>(CreateChannelController)
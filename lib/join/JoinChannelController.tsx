import { Component } from 'react'
import { useApolloClient } from 'react-apollo'
import gql from 'graphql-tag'
import { JoinChannel as GQJoinChannel } from '../../gql_types/JoinChannel'
import Router from 'next/router'

const JOIN_CHANNEL = gql`
  mutation JoinChannel($channel: ID!) {
    channelJoin(input: { channelId: $channel }) {
      id
    }
  }
`

type TRenderProps = {
  joinChannel: (code: string) => Promise<boolean>
}

export const useJoinChannel = () => {
  const client = useApolloClient()

  return {
    joinChannel: async (code: string) => {
      if (!/^[A-Z]+$/.test(code)) {
        return false
      }

      const mutationFdx = await client.mutate<GQJoinChannel>({
        mutation: JOIN_CHANNEL,
        variables: { channel: code }
      })

      if (mutationFdx.data.channelJoin) {
        Router.push({ pathname: '/remote', query: { p: code } })
        return true
      } else {
        return false
      }
    }
  }
}

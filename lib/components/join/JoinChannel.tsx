import { Button, TextField } from '@material-ui/core'
import { Component } from 'react'
import gql from 'graphql-tag'
import { ApolloConsumer, Mutation } from 'react-apollo'
import {
  JoinChannel as GQJoinChannel,
  JoinChannelVariables as GQJoinChannelVariables
} from '../../../gql_types/JoinChannel'
import Router from 'next/router'

type TProps = {}

type TState = { channel: string }

const JOIN_CHANNEL = gql`mutation JoinChannel($channel:ID!){
  channelJoin(input: {channelId: $channel}){
    id
  }
}`

class JoinChannelMutation extends Mutation <GQJoinChannel, GQJoinChannelVariables> {

}

export default class JoinChannel extends Component <TProps, TState> {

  state = { channel: '' }

  render() {

    return <ApolloConsumer>{client =>
      <div>
        <TextField value={this.state.channel} onChange={e => this.setState({ channel: e.target.value.toUpperCase() })}/>
        <Button
          onClick={async () => {
            const mutationFdx = await client.mutate<GQJoinChannel>({
              mutation: JOIN_CHANNEL,
              variables: { channel: this.state.channel }
            })
            Router.push({ pathname: '/remote', query: { p: this.state.channel } })
          }}>Join</Button>
      </div>
    }</ApolloConsumer>


    // return <JoinChannelMutation mutation={JOIN_CHANNEL}>{(joinChannel, { data, loading, error, called }) => {
    //
    //   if (loading) {
    //     return <div>Loading</div>
    //   }
    //
    //   if (error) {
    //
    //   }
    //
    //   if (called) {
    //     console.log(data)
    //
    //     return <div>Called join channel {data.channelJoin.id}</div>
    //   }
    //
    //   return <div>
    //     <TextField onChange={e => this.setState({ channel: e.target.value })}/> <Button
    //     onClick={() => joinChannel({ variables: { channel: this.state.channel } })}>Join</Button>
    //   </div>
    // }}
    // </JoinChannelMutation>
  }
}

import { Button, TextField } from '@material-ui/core'
import { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import {
  JoinChannel as GQJoinChannel,
  JoinChannelVariables as GQJoinChannelVariables
} from '../../../gql_types/JoinChannel'

type TProps = {}

type TState = { channel: string }

const JOIN_CHANNEL = gql`mutation JoinChannel($channel:ID!){
  channelJoin(input: {channelId: $channel})
}`

class JoinChannelMutation extends Mutation <GQJoinChannel, GQJoinChannelVariables> {

}

export default class JoinChannel extends Component <TProps, TState> {

  state = { channel: '' }

  render() {

    return <JoinChannelMutation mutation={JOIN_CHANNEL}>{(joinChannel, { data, loading, error, called }) => {

      if (loading) {
        return <div>Loading</div>
      }

      if (error) {

      }

      if (called) {
        return <div>Called join channel {data.channelJoin}</div>
      }

      return <div>
        <TextField onChange={e => this.setState({ channel: e.target.value })}/> <Button
        onClick={() => joinChannel({ variables: { channel: this.state.channel } })}>Join</Button>
      </div>
    }}
    </JoinChannelMutation>
  }
}

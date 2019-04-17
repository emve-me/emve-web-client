import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const CREATE_CHANNEL = gql`
  mutation CreateChannel($channelName: String){
    channelCreate(input: {channelName: $channelName})
  }`

type TState = { channelName: string }

type TProps = {}
//
// class CreateChannelMutation extends Mutation<>{
//
// }

export default class ChannelCreate extends Component <TProps, TState> {

  state = { channelName: '' }

  render() {
    return <div>
      <Mutation mutation={CREATE_CHANNEL}>{(createChannel, { data }) => {

        return <div>
          <TextField defaultValue={this.state.channelName} onChange={e => this.setState({ channelName: e.target.value })}/>
          <Button onClick={() => console.log('BUTTON', this.state.channelName)}>YTO</Button></div>
      }}
      </Mutation>
    </div>
  }
}

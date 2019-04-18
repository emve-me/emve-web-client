import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { CreateChannel, CreateChannelVariables } from '../remote/__generated__/CreateChannel'

const CREATE_CHANNEL = gql`
  mutation CreateChannel($channelName: String) {
    channelCreate(input: { channelName: $channelName })
  }
`

type TState = { channelName: string }

type TProps = {}

class CreateChannelMutation extends Mutation<CreateChannel,
  CreateChannelVariables> {
}

export default class ChannelCreate extends Component<TProps, TState> {
  state = { channelName: '' }

  render() {
    return (
      <div>
        <CreateChannelMutation mutation={CREATE_CHANNEL}>
          {(createChannel, { called, loading, data }) => {
            if (loading) {
              return <div>Loading...</div>
            }

            if (called) {
              return <div>channel id {data.channelCreate + ""}</div>
            }

            return (
              <div>
                <TextField
                  defaultValue={this.state.channelName}
                  onChange={e => this.setState({ channelName: e.target.value })}
                />
                <Button
                  onClick={() =>
                    createChannel({
                      variables: { channelName: this.state.channelName }
                    })
                  }>
                  YTO
                </Button>
              </div>
            )
          }}
        </CreateChannelMutation>
      </div>
    )
  }
}

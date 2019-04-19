import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { CreateChannel, CreateChannelVariables } from '../../../gql_types/CreateChannel'
import Link from 'next/link'

const CREATE_CHANNEL = gql`
  mutation CreateChannel($channelName: String) {
    channelCreate(input: { channelName: $channelName })


  }
`

type TState = { channelName: string }

type TProps = {}

class CreateChannelMutation extends Mutation<CreateChannel, CreateChannelVariables> {
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
              return <div>Invite your friends to visit emev.com/dofoof/{data.channelCreate}


                <div>connnect your speakers</div>
                <Link href={`/player?p=${data.channelCreate}`}>
                  <div>Start this party</div>
                </Link>

              </div>
            }

            return (
              <div>
                <TextField
                  value={this.state.channelName}
                  onChange={e => this.setState({ channelName: e.target.value })}
                />
                <Button
                  onClick={async () => {

                    await createChannel({
                      variables: { channelName: this.state.channelName }
                    })

                  }}>
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

import { Button, TextField } from '@material-ui/core'
import { Component } from 'react'
import JoinChannelController from './JoinChannelController'

type TProps = {}

type TState = { pairingCode: string }


export default class JoinChannel extends Component <TProps, TState> {

  state = { pairingCode: '' }

  render() {

    const { pairingCode } = this.state

    return <JoinChannelController>{({ joinChannel }) =>
      <div>
        <div>pairing code</div>

        <TextField value={pairingCode} onChange={e => this.setState({ pairingCode: e.target.value.toUpperCase() })}/>
        <Button
          onClick={async () => {
            joinChannel(pairingCode)
          }}>Join</Button>
      </div>
    }</JoinChannelController>
  }
}

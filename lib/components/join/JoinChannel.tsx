import { Button, TextField } from '@material-ui/core'
import { Component } from 'react'

type TProps = {}

type TState = { channel: string }

export default class JoinChannel extends Component <TProps, TState> {

  state = { channel: '' }

  render() {
    return <div>
      <TextField onChange={e => this.setState({ channel: e.target.value })}/> <Button
      onClick={() => console.log('join', this.state.channel)}>Join</Button>
    </div>
  }
}
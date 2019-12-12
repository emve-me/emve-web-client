import Button from './Button'
import getConfig from 'next/config'
import { Component } from 'react'
import copy from 'copy-to-clipboard'

const { baseUrl } = getConfig().publicRuntimeConfig

export default class extends Component<
  { channel: string },
  { copied: boolean }
> {
  state = { copied: false }

  render() {
    const { copied } = this.state
    const { channel } = this.props
    const directJoinLink = `${baseUrl}/remote?p=${channel}`

    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Share this join link</h2>
        <div
          style={{
            backgroundColor: '#fff',
            border: 'dashed 4px #666',
            padding: 16,
            margin: 16
          }}>
          {directJoinLink}
        </div>
        <Button
          onClick={() => {
            copy(directJoinLink)
            this.setState({ copied: true })
            window.setTimeout(() => this.setState({ copied: false }), 3000)
          }}>
          {copied ? 'Copied' : 'Copy to Clipboard'}
        </Button>
      </div>
    )
  }
}

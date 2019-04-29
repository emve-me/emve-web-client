import React, { Component } from 'react'
import Shell from '../Shell'
import getConfig from 'next/config'


export default class PlayerEmptyState extends Component<{ channel: string }> {

  render() {

    const { channel } = this.props

    const directJoinLink = `${getConfig().publicRuntimeConfig.baseUrl}/remote?p=${channel}`

    return <Shell>

      { /*language=CSS*/}
      <style jsx>{`
          .channel {
              border: 4px dashed #666;
              height: 100px;
              font-size: 50px;
              margin: 0;
              padding: 10px;
              background-color: white;
              width: 220px;
              display: flex;
              justify-content: center;
              align-items: center;
          }`}
      </style>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: 40, paddingBottom: 16, textAlign: 'center' }}>Visit emve.me on another device as a
          remote
        </div>
        <div style={{ fontSize: 30, paddingBottom: 16 }}>Enter pairing code</div>
        <div className='channel'>{channel}</div>
        <div style={{ paddingTop: 16 }}>OR</div>
        <div style={{ padding: '16px 0 8px 0' }}>Share this direct join link</div>
        <div><a href={directJoinLink} target='_blank'>{directJoinLink}</a></div>
      </div>
    </Shell>
  }
}
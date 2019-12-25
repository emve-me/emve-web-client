import React, { Component } from 'react'
import Shell from '../ui/Shell'
import MobileFooterNav from '../ui/MobileFooterNav'
import InviteGuests from '../ui/InviteGuests'

export const PlayerEmptyState: React.FC<{
  channel: string
}> = ({ channel }) => {
  return (
    <Shell visibleOnMobile={false}>
      {/*language=CSS*/}
      <style jsx>
        {`
          .root {
            padding-top: 100px;
          }

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
          }

          @media only screen and (max-width: 905px) {
            .root {
              padding-top: 50px;
            }
          }
        `}
      </style>
      <div
        className="root"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <h1 style={{ paddingBottom: 16, textAlign: 'center' }}>Pairing code</h1>
        <h2 style={{ paddingBottom: 16, textAlign: 'center' }}>
          Join as a Remote using this code:
        </h2>

        <div className="channel">{channel}</div>
        <div style={{ paddingTop: 16 }}>OR</div>
        <div style={{ padding: '16px 0 8px 0' }}>
          <InviteGuests channel={channel} />
        </div>
      </div>
      <MobileFooterNav style={{ paddingTop: 16 }} />
    </Shell>
  )
}

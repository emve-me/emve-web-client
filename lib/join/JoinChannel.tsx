import React, { Component } from 'react'
import JoinChannelController from './JoinChannelController'
import MobileFooterNav from '../MobileFooterNav'
import Button from '../ui/Button'

// todo handle invalid code error message
export default class JoinChannel extends Component<
  {},
  { pairingCode: string }
> {
  state = { pairingCode: '' }

  render() {
    const { pairingCode } = this.state

    return (
      <JoinChannelController>
        {({ joinChannel }) => (
          <div className="root">
            {/*language=CSS*/}
            <style jsx>{`
              .root {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding-top: 50px;
              }

              .input {
                border: 4px dashed #666;
                outline: none;
                height: 100px;
                font-size: 50px;
                margin: 0;
                padding: 10px;
                width: 220px;
                text-align: center;
                background-color: #fff;
              }

              .pairingCodeContainer {
                padding-top: 50px;
                padding-bottom: 0px;
              }

              @media only screen and (max-width: 905px) {
                .root {
                  padding-top: 25px;
                }

                .pairingCodeContainer {
                  padding-top: 25px;
                }
              }
            `}</style>

            <h1>Player pairing code</h1>

            <div className="pairingCodeContainer">
              <input
                placeholder="CODE"
                autoFocus
                onKeyDown={({ keyCode }) => {
                  if (keyCode === 13) joinChannel(pairingCode)
                }}
                className="input"
                type="text"
                value={pairingCode}
                onChange={e =>
                  this.setState({ pairingCode: e.target.value.toUpperCase() })
                }
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: 12
                }}>
                <Button
                  style={{
                    display: pairingCode.length >= 4 ? 'block' : 'none',
                    flex: 1
                  }}
                  onClick={() => joinChannel(pairingCode)}>
                  Join Party!
                </Button>
              </div>
            </div>
            <MobileFooterNav style={{ paddingTop: 16 }} />
          </div>
        )}
      </JoinChannelController>
    )
  }
}

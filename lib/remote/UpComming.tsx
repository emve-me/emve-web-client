import ChannelController from '../consumers/ChannelController'
import React from 'react'
import LoadingIndicator from '../ui/LoadingIndicator'
import RemoteEmptyState from './RemoteEmptyState'
import Card from './Card'
import { UpCommingTrack } from './Track'

type TProps = {
  channel: string
}

export default ({ channel }: TProps) => (
  <ChannelController channel={channel}>
    {({ upComing, nowPlaying, loading, owner }) => {
      if (loading) {
        return <LoadingIndicator />
      }

      const hasTracks = nowPlaying || upComing.length > 0

      return (
        <>
          {!hasTracks ? (
            <Card>
              <RemoteEmptyState />
            </Card>
          ) : (
            false
          )}

          {hasTracks ? (
            <Card>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                {nowPlaying ? (
                  <>
                    <div
                      style={{
                        padding: '0px 0 16px 0',
                        fontSize: 16,
                        color: '#444',
                        fontWeight: 600
                      }}>
                      Now playing
                    </div>
                    <UpCommingTrack {...nowPlaying} />
                  </>
                ) : (
                  false
                )}

                {upComing.length > 0 ? (
                  <div
                    style={{
                      padding: '0px 0 16px 0',
                      fontSize: 16,
                      color: '#444',
                      fontWeight: 600
                    }}>
                    Coming up
                  </div>
                ) : (
                  false
                )}
                {upComing.map(({ node }) => (
                  <UpCommingTrack key={node.id} {...node} />
                ))}
              </div>
            </Card>
          ) : (
            false
          )}

          <Card
            style={{
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <div>
              <img
                style={{
                  borderRadius: 55,
                  width: 55,
                  border: 'solid 2px #ff2f7f'
                }}
                src={owner.picture}
              />
            </div>

            <div style={{ lineHeight: '175%', textAlign: 'center' }}>
              <div style={{ padding: '0px 0', fontWeight: 400, fontSize: 18 }}>
                Welcome to {owner.firstName}'s party!
              </div>

              <div>
                Pairing code: <span>{channel}</span>
              </div>
              <div>
                <a href="">Invite guests</a>
              </div>
            </div>
          </Card>
        </>
      )
    }}
  </ChannelController>
)

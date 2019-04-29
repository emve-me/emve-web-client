import ChannelController from '../consumers/ChannelController'
import React from 'react'
import LoadingIndicator from '../ui/LoadingIndicator'
import { TrackOnChannel } from '../../gql_types/TrackOnChannel'
import { TrackState } from '../../gql_types/globalTypes'
import RemoteEmptyState from './RemoteEmptyState'
import Shell from '../Shell'

type TProps = {
  channel: string
}

const Track = ({ thumb, title, owner, state }: TrackOnChannel) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
    <div style={{ paddingRight: 16 }}>
      <img style={{ width: 140, borderRadius: 6 }} src={thumb} />
    </div>
    <div>
      <div dangerouslySetInnerHTML={{ __html: title }} />
      <div style={{ display: 'flex', alignItems: 'center', paddingTop: 4 }}>
        <img
          src={owner.picture}
          style={{ width: 25, height: 25, borderRadius: 50 }}
        />
        <div style={{ color: '#666', paddingLeft: 6, fontSize: 15 }}>
          {owner.fullName}
        </div>
      </div>
    </div>
  </div>
)

const Card = ({
  children,
  style
}: {
  style?: React.CSSProperties
  children: React.ReactNode
}) => (
  <div className="root" style={style}>
    {/*language=CSS*/}
    <style jsx>
      {`
        .root {
          flex: 1;
          margin-bottom: 24px;
          background-color: #fff;
          padding: 24px;
          border-radius: 4px;
          border: solid 1px #ccc;
        }

        @media only screen and (max-width: 905px) {
          .root {
          }
        }
      `}
    </style>
    {children}
  </div>
)

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
                    <Track {...nowPlaying} />
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
                  <Track key={node.id} {...node} />
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

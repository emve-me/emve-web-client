import ChannelController from '../consumers/ChannelController'
import React from 'react'
import LoadingIndicator from '../ui/LoadingIndicator'
import RemoteEmptyState from './RemoteEmptyState'
import Card from './Card'
import { UpComingTrack } from './Track'
import Link from 'next/link'
import LoggedInUserController from '../consumers/LoggedInUserController'
import HostBox from './HostBox'

type TProps = {
  channel: string
}

export default ({ channel }: TProps) => (
  <LoggedInUserController>
    {({ user: loggedInUser }) => (
      <ChannelController channel={channel}>
        {({ upComing, nowPlaying, loading, owner }) => {
          if (loading) {
            return <LoadingIndicator />
          }

          const hasTracks = nowPlaying || (upComing && upComing.length > 0)

          return (
            <>
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
                        <UpComingTrack
                          channelOwner={owner}
                          track={nowPlaying}
                          loggedInUser={loggedInUser}
                        />
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
                      <UpComingTrack
                        loggedInUser={loggedInUser}
                        key={node.id}
                        track={node}
                        channelOwner={owner}
                      />
                    ))}
                  </div>
                </Card>
              ) : (
                false
              )}

              <HostBox owner={owner} channel={channel} />

              {!hasTracks ? (
                <Card>
                  <RemoteEmptyState />
                </Card>
              ) : (
                false
              )}
            </>
          )
        }}
      </ChannelController>
    )}
  </LoggedInUserController>
)

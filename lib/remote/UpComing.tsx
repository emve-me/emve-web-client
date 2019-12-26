import useChannel from '../consumers/useChannel'
import React from 'react'
import LoadingIndicator from '../ui/LoadingIndicator'
import RemoteEmptyState from './RemoteEmptyState'
import Card from './Card'
import { UpComingTrack } from './Track'
import HostBox from './HostBox'
import { useLoggedInUser } from '../consumers/useLoggedInUser'

type TProps = {
  channel: string
}

export default ({ channel }: TProps) => {
  const { user: loggedInUser } = useLoggedInUser()
  const { upComing, nowPlaying, loading, owner } = useChannel({
    channel,
    onPlayer: false
  })

  if (loading) return <LoadingIndicator />

  const hasTracks = nowPlaying || (upComing && upComing.length > 0)

  return (
    <>
      {hasTracks && (
        <Card>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
            {nowPlaying && (
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
            )}

            {upComing.length > 0 && (
              <div
                style={{
                  padding: '0px 0 16px 0',
                  fontSize: 16,
                  color: '#444',
                  fontWeight: 600
                }}>
                Coming up
              </div>
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
      )}

      <HostBox owner={owner} channel={channel} />

      {!hasTracks && (
        <Card>
          <RemoteEmptyState />
        </Card>
      )}
    </>
  )
}

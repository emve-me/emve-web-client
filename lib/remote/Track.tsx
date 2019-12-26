import { TrackOnChannel } from '../../gql_types/TrackOnChannel'
import React from 'react'
import { TrackState } from '../../gql_types/globalTypes'
import useRemoveTrack from './useRemoveTrack'
import { UpComingTracksGQL_channel_owner } from '../../gql_types/UpComingTracksGQL'
import { GetLoggedInUser_loggedInUser } from '../../gql_types/GetLoggedInUser'

type TTrack = {
  onClick?: () => void
  title: string
  thumb: string
  children?: React.ReactNode
}

export function SearchResultTrack({ onClick, title, thumb, children }: TTrack) {
  return (
    <div className="root" onClick={onClick}>
      {/*language=CSS*/}
      <style jsx>
        {`
          .root {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            cursor: ${onClick ? 'pointer' : ''};
          }

          .thumb {
            width: 140px;
            height: 105px;
            background-color: #eee;
            border-radius: 6px;
          }

          .thumbContainer {
            padding-right: 16px;
          }

          @media only screen and (max-width: 905px) {
            .thumb {
              width: 100px;
              height: 75px;
            }
          }
        `}
      </style>

      <div className="thumbContainer">
        <img className="thumb" src={thumb} />
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: title }} />
        {children}
      </div>
    </div>
  )
}

export function UpComingTrack({
  track,
  channelOwner,
  loggedInUser
}: {
  track: TrackOnChannel
  channelOwner: UpComingTracksGQL_channel_owner
  loggedInUser: GetLoggedInUser_loggedInUser
}) {
  const { thumb, title, owner, state, id } = track
  const [canRemove, removeTrack] = useRemoveTrack(track)

  return (
    <SearchResultTrack title={title} thumb={thumb}>
      <div style={{ display: 'flex', alignItems: 'center', paddingTop: 4 }}>
        <img
          src={owner.picture}
          style={{ width: 25, height: 25, borderRadius: 50 }}
        />

        <div style={{ color: '#666', paddingLeft: 6, fontSize: 15 }}>
          {owner.fullName}
        </div>

        {canRemove && (
          <div
            onClick={removeTrack!}
            style={{ color: '#666', paddingLeft: 6, fontSize: 15 }}>
            &middot; <a>{state === TrackState.playing ? 'skip' : 'remove'}</a>
          </div>
        )}
      </div>
    </SearchResultTrack>
  )
}

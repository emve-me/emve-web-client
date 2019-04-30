import { TrackOnChannel } from '../../gql_types/TrackOnChannel'
import React from 'react'
import { TrackState } from '../../gql_types/globalTypes'
import gql from 'graphql-tag'
import RemoveTrackController from './RemoveTrackController'

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

          @media only screen and (max-width: 905px) {
          }
        `}
      </style>

      <div style={{ paddingRight: 16 }}>
        <img style={{ width: 140, borderRadius: 6 }} src={thumb} />
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: title }} />
        {children}
      </div>
    </div>
  )
}

export function UpComingTrack({
  thumb,
  title,
  owner,
  state,
  userCanRemove,
  id
}: TrackOnChannel) {
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

        {userCanRemove ? (
          <RemoveTrackController track={id}>
            {({ removeTrack }) => (
              <div
                onClick={removeTrack}
                style={{ color: '#666', paddingLeft: 6, fontSize: 15 }}>
                &middot;{' '}
                <a>{state === TrackState.playing ? 'skip' : 'remove'}</a>
              </div>
            )}
          </RemoveTrackController>
        ) : (
          false
        )}
      </div>
    </SearchResultTrack>
  )
}

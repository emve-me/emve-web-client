import { TrackOnChannel } from '../../gql_types/TrackOnChannel'
import Shell from '../Shell'
import React from 'react'

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

          .root :hover {
          }

          @media only screen and (max-width: 905px) {
            .root {
            }
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

export function UpCommingTrack({ thumb, title, owner, state }: TrackOnChannel) {
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
      </div>
    </SearchResultTrack>
  )
}

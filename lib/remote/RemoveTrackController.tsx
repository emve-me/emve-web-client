import { Mutation } from 'react-apollo'
import { Component } from 'react'
import gql from 'graphql-tag'
import { RemoveTrack, RemoveTrackVariables } from '../../gql_types/RemoveTrack'

const REMOVE_TRACK = gql`
  mutation RemoveTrack($track: ID!) {
    removeTrack(input: { track: $track })
  }
`

type TProps = {
  track: string
  children: ({ removeTrack }) => React.ReactNode
}

class RemoveTrackMutation extends Mutation<RemoveTrack, RemoveTrackVariables> {}

const RemoveTrackController: React.FC<TProps> = ({ track, children }) => {
  return (
    <RemoveTrackMutation mutation={REMOVE_TRACK} variables={{ track }}>
      {(removeTrack, { data, loading }) => children({ removeTrack })}
    </RemoveTrackMutation>
  )
}

export { RemoveTrackController as default }

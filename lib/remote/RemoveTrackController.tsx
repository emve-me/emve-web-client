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
  children: ({ removeTrack }: { removeTrack: any }) => JSX.Element
}

const RemoveTrackController: React.FC<TProps> = ({ track, children }) => {
  return (
    <Mutation<RemoveTrack, RemoveTrackVariables>
      mutation={REMOVE_TRACK}
      variables={{ track }}>
      {(removeTrack, { data, loading }) => children({ removeTrack })}
    </Mutation>
  )
}

export default RemoveTrackController

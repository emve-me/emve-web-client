import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { RemoveTrack, RemoveTrackVariables } from '../../gql_types/RemoveTrack'
import { TrackState } from '../../gql_types/globalTypes'
import { useLoggedInUser } from '../consumers/useLoggedInUser'
import { TrackOnChannel } from '../../gql_types/TrackOnChannel'

const REMOVE_TRACK = gql`
  mutation RemoveTrack($track: ID!) {
    removeTrack(input: { track: $track })
  }
`

const useRemoveTrack = (
  track: TrackOnChannel
): [boolean, () => void | undefined] => {
  const { user } = useLoggedInUser()

  const canRemove = (() => {
    if (user.id === track.owner.id) return true

    if (track.state !== TrackState.playing) {
      return user.id === track.owner.id
    }

    return false
  })()

  const [removeTrack, { data, loading }] = useMutation<
    RemoveTrack,
    RemoveTrackVariables
  >(REMOVE_TRACK, { variables: { track: track.id } })

  return [canRemove, canRemove ? removeTrack : undefined]
}

export default useRemoveTrack

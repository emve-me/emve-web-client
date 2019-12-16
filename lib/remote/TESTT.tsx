import { useQuery } from 'react-apollo'
import {
  UpComingTracksGQL,
  UpComingTracksGQLVariables
} from '../../gql_types/UpComingTracksGQL'
import { UPCOMING_QUERY } from '../consumers/useChannelController'

export const TEST: React.FC<{ channel: string }> = ({ channel }) => {
  const { data, error, loading } = useQuery<
    UpComingTracksGQL,
    UpComingTracksGQLVariables
  >(UPCOMING_QUERY, { variables: { channel } })

  if (loading) return <></>

  return (
    <div>
      {data.channel.tracks.edges.map(m => (
        <div key={m.node.id}>{m.node.title}</div>
      ))}
    </div>
  )
}

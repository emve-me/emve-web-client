import { Component } from 'react'
import { Query, withApollo, WithApolloClient } from 'react-apollo'
import {
  UpComingTracksGQL,
  UpComingTracksGQLVariables
} from '../../gql_types/UpComingTracksGQL'
import gql from 'graphql-tag'
import { SearchResultTrack } from '../remote/Track'

export const TRAK_FRAG = gql`
  fragment TrackOnChannel on Track {
    id
    title
    videoId
    state
    thumb
    owner {
      id
      fullName
      firstName
      picture
    }
  }
`

const UPCOMING_QUERY = gql`
  query UpComingTracksGQL($channel: ID!) {
    channel(input: { id: $channel, played: true }) {
      nowPlaying {
        ...TrackOnChannel
      }
      owner {
        id
        fullName
        firstName
        picture
      }
      tracks(played: false) {
        edges {
          node {
            ...TrackOnChannel
          }
        }
      }
    }
  }
  ${TRAK_FRAG}
`

class UpComingTracksQuery extends Query<
  UpComingTracksGQL,
  UpComingTracksGQLVariables
> {}

type TProps = {
  channel: string
}

class History extends Component<WithApolloClient<TProps>> {
  subscription: ZenObservable.Subscription

  render() {
    return (
      <UpComingTracksQuery
        query={UPCOMING_QUERY}
        variables={{ channel: this.props.channel }}>
        {({ data, error, loading, client }) => {
          if (loading) {
            return <div>Loading</div>
          }

          return (
            <div>
              {data.channel.tracks.edges.map(
                ({ node: { title, thumb, id } }) => (
                  <SearchResultTrack key={id} thumb={thumb} title={title} />
                )
              )}
            </div>
          )

          if (error) {
            return <div>{error}</div>
          }
        }}
      </UpComingTracksQuery>
    )
  }
}

export default withApollo<TProps>(History)

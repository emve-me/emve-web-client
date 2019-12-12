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
    channel(id: $channel) {
      nowPlaying {
        ...TrackOnChannel
      }
      owner {
        id
        fullName
        firstName
        picture
      }
      tracks(played: true) {
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

type TProps = {
  channel: string
}

class History extends Component<WithApolloClient<TProps>> {
  render() {
    return (
      <Query<UpComingTracksGQL, UpComingTracksGQLVariables>
        query={UPCOMING_QUERY}
        variables={{ channel: this.props.channel }}>
        {({ data, error, loading, client }) => {
          if (loading) {
            return <div>Loading</div>
          }

          return (
            <div>
              {data.channel.tracks.edges.map(
                ({ node: { owner, title, thumb, id } }) => (
                  <SearchResultTrack key={id} thumb={thumb} title={title}>
                    <div>{owner.fullName}</div>
                  </SearchResultTrack>
                )
              )}
            </div>
          )

          if (error) {
            return <div>{error}</div>
          }
        }}
      </Query>
    )
  }
}

export default withApollo<TProps>(History)

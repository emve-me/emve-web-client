import { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { UpComingTracksGQL, UpComingTracksGQLVariables } from '../../../gql_types/UpComingTracksGQL'

const UPCOMING_QUERY = gql`query UpComingTracksGQL($channel: ID!) {
  channel(id: $channel){
    tracks{
      edges{
        node{
          id
          title
        }
      }
    }
  }
}`

class UpComingTracksQuery extends Query<UpComingTracksGQL, UpComingTracksGQLVariables> {

}

type TProps = {
  channel: string
}

export default class UpComming extends Component <TProps> {

  render() {

    return <UpComingTracksQuery query={UPCOMING_QUERY}
                                variables={{ channel: this.props.channel }}>{({ data, loading }) => {

                                  console.log(data)

      return <div>UOCOMCMM</div>

    }}</UpComingTracksQuery>

  }
}
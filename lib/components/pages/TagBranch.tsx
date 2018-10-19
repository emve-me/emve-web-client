import { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Link from 'next/link'
import LoadingIndicator from '../../components/LoadingIndicator'
import { Query } from 'react-apollo'

const QUERY_GET_NODE = gql`
    query getTags($parent: ID!) {
        tags(parent: $parent) {
            parent
            name
            id
            strongName
            weight
        }
    }
`

export default class TagBranch extends Component {
  render() {
    return <div>
      {this.props.parent}
      <Query query={QUERY_GET_NODE} variables={{parent:this.props.parent}}>{({error, data, client, loading, variables }) => {



        if (loading) {
          return <LoadingIndicator />
        }
        const { tags } = data

        return tags.map(tag => (
          <Link key={tag.id} href={{ pathname: '/tags', query: { id: tag.id } }}>
            <div style={{ padding: '1rem' }} key={tag.id}>
              <style jsx>{`
            div {
              cursor: pointer;
            }

            div:hover {
              background-color: #fefefe;
            }
          `}</style>
              {tag.name} - {tag.id} - {tag.strongName}
            </div>
          </Link>
        ))

      }}</Query>
    </div>

  }
}
//
// export default graphql(
//   gql`
//     query getTags($parent: String) {
//       tags(parent: $parent) {
//         parent
//         name
//         id
//         strongName
//         weight
//       }
//     }
//   `,
//   {
//     options: props => ({ variables: { parent: props.parent } })
//   }
// )(TagBranch)

import { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

const COMMENTS_SUBSCRIPTION = gql`
  subscription Videos {
    videoPushed{
      id
    }
  }
`

export class PlayerMain extends Component {

  render() {

    return <Subscription subscription={COMMENTS_SUBSCRIPTION}>
      {({ data, loading }) => {

        return <div>{JSON.stringify(data)}</div>

      }}
    </Subscription>

  }

}
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

export class SubscriptionTest extends Component {

  render() {

    return <Subscription subscription={COMMENTS_SUBSCRIPTION}>
      {({ data, loading }) => {

        console.log({ data })
        return <div>TOMOM</div>

      }}
    </Subscription>

  }

}
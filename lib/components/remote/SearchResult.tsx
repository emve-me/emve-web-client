import React , { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const ADD_VIDEO = gql`
  mutation addVideo($videoId: ID) {
    videoPush(input: { videoId: $videoId })
  }
`

type PROPS = {
  item: {
    id: { videoId }
    snippet: {
      title
      thumbnails: { high: { url } }
    }
  }
}

type STATE = {}

export class SearchResult extends Component<PROPS, STATE> {
  render() {
    const { item } = this.props

    return (
      <Mutation mutation={ADD_VIDEO}>
        {(addVideo, { data }) => (
          <div
            onClick={async () => {
              const addVideoResp = await addVideo({ variables: { videoId: item.id.videoId } })
              console.log('resp', addVideoResp)
            }}
            style={{ cursor: 'pointer', padding: '1rem' }}>
            <div
              style={{
                fontFamily: 'arial',
                paddingBottom: '.5rem',
                textAlign: 'center',
                fontSize: '1.2rem'
              }}>
              <div dangerouslySetInnerHTML={{ __html: item.snippet.title }}/>
            </div>
            <img style={{ width: '100%', borderRadius: 5 }} src={item.snippet.thumbnails.high.url}/>
          </div>
        )}
      </Mutation>
    )
  }
}

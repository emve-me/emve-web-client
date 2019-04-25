import React, { Component } from 'react'
import { withRouter, WithRouterProps } from 'next/router'
import SearchResults from './search/SearchResults'
import UpComming from './UpComming'
import { SearchBox } from './search/SearchBox'

// TODO remove key from here
type TState = { search: string }

type TProps = {}

class RemoteMain extends Component<TProps & WithRouterProps<{ p: string; }>, TState> {

  state = { search: '' }

  render() {

    const channel = this.props.router.query.p
    const { search } = this.state

    return (
      <>
        <SearchBox value={search} placeholder='Search' onChange={search => this.setState({ search })}/>

        <div style={{
          paddingTop: '6rem',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {search.trim() ? <SearchResults channel={channel} search={search}/> : <UpComming channel={channel}/>}
        </div>
      </>
    )
  }
}

export default withRouter(RemoteMain)

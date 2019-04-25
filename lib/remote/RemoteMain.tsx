import React, { Component } from 'react'
import SearchResults from './search/SearchResults'
import UpComming from './UpComming'
import { SearchBox } from './search/SearchBox'

type TProps = {
  channel: string
}

type TState = {
  search: string
  searching: boolean
}

export default class RemoteMain extends Component  <TProps, TState> {

  state = { search: '', searching: false }

  render() {

    const { channel } = this.props
    const { search } = this.state

    return (
      <>
        <SearchBox value={search} placeholder='Search YouTube' onChange={search => this.setState({ search })}/>
        <div style={{
          width: 800, paddingTop: '6rem',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {search.trim() ?
            <SearchResults onSelect={(item => this.setState({ search: '' }))} channel={channel} search={search}/> :
            <UpComming channel={channel}/>}
        </div>
      </>
    )
  }
}



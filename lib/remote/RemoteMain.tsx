import React, { Component } from 'react'
import SearchResults from './search/SearchResults'
import UpComming from './UpComming'
import { SearchBox } from './search/SearchBox'

type TProps = {
  channel: string
}

type TState = {
  search: string
  searchDebounced: string
  searching: boolean
}

export default class RemoteMain extends Component  <TProps, TState> {

  state = { search: '', searchDebounced: '', searching: false }


  render() {

    const { channel } = this.props
    const { search, searchDebounced } = this.state

    return (
      <>
        <SearchBox value={search} placeholder='Search YouTube'
                   onChangeDebounced={searchDebounced => this.setState({ searchDebounced })}
                   onChange={search => this.setState({ search })}/>
        <div style={{
          width: 800, paddingTop: '6rem',
          margin: '0 auto',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {search.trim() ?
            <SearchResults onSelect={(item => this.setState({ search: '', searchDebounced: '' }))} channel={channel}
                           search={searchDebounced.trim()}/> :
            <UpComming channel={channel}/>}
        </div>
      </>
    )
  }
}



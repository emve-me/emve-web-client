import React, { Component } from 'react'
import SearchResults from './search/SearchResults'
import UpComming from './UpComming'
import { SearchBox } from './search/SearchBox'
import HeaderPortal from '../HeaderPortal'

type TProps = {
  channel: string
  toggleState: (searching: boolean) => void
}

type TState = {
  search: string
  debouncedSearch: string
  searching: boolean
}


class RemoteMain extends Component  <TProps, TState> {

  state = { search: '', debouncedSearch: '', searching: false }

  render() {

    const { channel } = this.props
    const { search, debouncedSearch } = this.state

    const isSearching = !search.trim()

//    this.props.toggleState(isSearching)

    return (
      <>
        <HeaderPortal>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchBox width='800px' value={search} placeholder='Search YouTube'
                       onChangeDebounced={debouncedSearch => this.setState({ debouncedSearch })}
                       onChange={search => this.setState({ search })}/>
          </div>
        </HeaderPortal>

        <div style={{
          width: 800, paddingTop: '32px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>

          <SearchResults onSelect={(item => this.setState({ search: '', debouncedSearch: '' }))} channel={channel}
                         search={debouncedSearch.trim()}/>


          <UpComming channel={channel}/>

        </div>
      </>
    )
  }
}


export default class Re extends Component <{ channel: string }, { searching: boolean }> {


  render() {
    const { channel } = this.props

    return <>
      <RemoteMain toggleState={searching => null} channel={channel}/>
    </>
  }
}


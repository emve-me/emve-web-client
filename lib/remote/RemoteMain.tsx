import React, { Component, RefObject } from 'react'
import SearchResults from './search/SearchResults'
import UpComming from './UpComming'
import { SearchBox } from './search/SearchBox'
import HeaderPortal from '../HeaderPortal'
import Shell from '../Shell'

type TProps = {
  channel: string
  shell?: RefObject<Shell>
}

type TState = {
  search: string
  debouncedSearch: string
  searching: boolean
}


export default class RemoteMain extends Component  <TProps, TState> {

  state = { search: '', debouncedSearch: '', searching: false }

  render() {


    const { channel, shell } = this.props
    const { search, debouncedSearch } = this.state


    const isSearching = search.trim()


    return (
      <>
        { /*language=CSS*/}
        <style jsx>{`
            .container {
                width: 800px;
                padding-top: 32px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: center;

            }`
        }
        </style>
        <HeaderPortal>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchBox width='800px' value={search} placeholder='Search YouTube'
                       onChangeDebounced={debouncedSearch => this.setState({ debouncedSearch })}
                       onChange={search => this.setState({ search })}/>
          </div>
        </HeaderPortal>

        <div className='container' style={{ display: isSearching ? 'flex' : 'none' }}>
          <SearchResults onSelect={(item => this.setState({ search: '', debouncedSearch: '' }))} channel={channel}
                         search={debouncedSearch.trim()}/>
        </div>

        <div className='container' style={{ display: !isSearching ? 'flex' : 'none' }}>
          <UpComming channel={channel}/>
        </div>
      </>
    )
  }
}



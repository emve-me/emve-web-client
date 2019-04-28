import React, { Component, RefObject } from 'react'
import SearchResults from './search/SearchResults'
import UpComming from './UpComming'
import { SearchBox } from './search/SearchBox'
import Shell from '../Shell'

type TProps = {
  channel: string
}

type TState = {
  search: string
  debouncedSearch: string
  searching: boolean
}

export default class RemoteMain extends Component  <TProps, TState> {

  state = { search: '', debouncedSearch: '', searching: false }

  render() {

    const { channel } = this.props
    const { search, debouncedSearch } = this.state

    const isSearching = search.trim()

    return (
      <Shell header={
        <SearchBox value={search} placeholder='Search YouTube'
                   onChangeDebounced={debouncedSearch => this.setState({ debouncedSearch })}
                   onChange={search => this.setState({ search })}/>
      }>
        { /*language=CSS*/}
        <style jsx>{`
            .container {
                width: 800px;
                padding-top: 32px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            @media only screen and (max-width: 905px) {
                .container {
                width: auto;
                    flex: 1px;
                    margin: 0 32px 0 32px;
                }
            }`
        }
        </style>

        <div className='container' style={{ display: isSearching ? 'flex' : 'none' }}>
          <SearchResults onSelect={(item => this.setState({ search: '', debouncedSearch: '' }))} channel={channel}
                         search={debouncedSearch.trim()}/>
        </div>

        <div className='container' style={{ display: !isSearching ? 'flex' : 'none' }}>
          <UpComming channel={channel}/>
        </div>
      </Shell>
    )
  }
}



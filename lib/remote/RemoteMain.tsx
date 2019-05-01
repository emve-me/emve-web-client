import React, { Component, RefObject } from 'react'
import SearchResults from './search/SearchResults'
import UpComing from './UpComing'
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

export default class RemoteMain extends Component<TProps, TState> {
  state = { search: '', debouncedSearch: '', searching: false }

  render() {
    const { channel } = this.props
    const { search, debouncedSearch } = this.state

    const isSearching = search.trim()

    return (
      <Shell
        logoVisibleOnMobile={false}
        header={
          <SearchBox
            debounceDelay={100}
            value={search}
            placeholder="Search YouTube"
            onChangeDebounced={debouncedSearch =>
              this.setState({ debouncedSearch })
            }
            onChange={search => this.setState({ search })}
          />
        }>
        {/*language=CSS*/}
        <style jsx>
          {`
            .container {
              width: 800px;
              margin: 24px auto;
              display: flex;
              flex-direction: column;
              justify-content: center;
              flex: 1;
            }

            @media only screen and (max-width: 905px) {
              .container {
                width: auto;
                margin: 16px 4px;
              }
            }
          `}
        </style>

        <div
          className="container"
          style={{ display: isSearching ? 'flex' : 'none' }}>
          <SearchResults
            onSelect={item =>
              this.setState({ search: '', debouncedSearch: '' })
            }
            channel={channel}
            search={debouncedSearch.trim()}
          />
        </div>

        <div
          className="container"
          style={{ display: !isSearching ? 'flex' : 'none' }}>
          <UpComing channel={channel} />
        </div>
      </Shell>
    )
  }
}

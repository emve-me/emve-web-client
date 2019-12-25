import React, { Component, RefObject, useState } from 'react'
import SearchResults from './search/SearchResults'
import UpComing from './UpComing'
import { SearchBox } from './search/SearchBox'
import Shell from '../ui/Shell'

export default ({ channel }: { channel: string }) => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const isSearching = !!search.trim()

  return (
    <Shell
      logoVisibleOnMobile={false}
      header={
        <SearchBox
          debounceDelay={100}
          value={search}
          placeholder="Search YouTube"
          onChangeDebounced={debouncedSearch =>
            setDebouncedSearch(debouncedSearch)
          }
          onChange={search => setSearch(search)}
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
              margin: 16px 0px;
            }
          }
        `}
      </style>

      <div
        className="container"
        style={{ display: isSearching ? 'flex' : 'none' }}>
        <SearchResults
          onSelect={item => {
            setSearch('')
            setDebouncedSearch('')
          }}
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

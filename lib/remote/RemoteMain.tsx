import React, { Component } from 'react'
import SearchResults from './search/SearchResults'
import UpComming from './UpComming'
import { SearchBox } from './search/SearchBox'
import HeaderPortal from '../HeaderPortal'


export default class RemoteMain extends Component<{ channel: string }, { search: string }> {

  state = { search: '' }

  render() {

    const { channel } = this.props
    const { search } = this.state

    return (
      <>
        <HeaderPortal>
          <SearchBox value={search} placeholder='Search' onChange={search => this.setState({ search })}/>
          <div style={{
            paddingTop: '6rem',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ maxWidth: 700 }}>
              {search.trim() ?
                <SearchResults onSelect={(item => this.setState({ search: '' }))} channel={channel} search={search}/> :
                <UpComming channel={channel}/>}</div>
          </div>
        </HeaderPortal>
      </>
    )
  }
}



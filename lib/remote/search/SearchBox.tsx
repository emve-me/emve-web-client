import React, { Component } from 'react'
import { validate } from 'graphql'
import HeaderPortal from '../../HeaderPortal'
import SearchIcon from '../../icons/SearchIcon'
import BackIcon from '../../icons/BackIcon'

type TProps = { value: string, placeholder: string, onChange: (value: string) => void }
type TState = { searching: boolean }

export class SearchBox extends Component<TProps, TState> {

  state = { searching: false }
  inputRef = React.createRef<HTMLInputElement>()

  keyListener = ({ key, composed, code, target }: KeyboardEvent) => {
    if (key === 'Escape') {
      this.deactivateSearch()
    } else if (target !== this.inputRef.current && key.length === 1 && key.match(/[a-z0-9]/i)) {
      this.activateSearch()
    } else if (key === 'Backspace' && this.props.value.trim()) {
      this.inputRef.current.focus()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyListener, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyListener, false)
  }

  toggleSearch = () => {
    this.setState(({ searching }) => ({
      searching: !searching
    }))
  }

  activateSearch = () => {
    console.log('activate search')
    this.setState({ searching: true }, () => this.inputRef.current.focus())
  }

  deactivateSearch = () => {
    this.props.onChange('')
    this.setState({ searching: false })
  }


  render() {
    const { value, placeholder, onChange } = this.props
    const { searching } = this.state

    return <HeaderPortal>
      <div className='root'>
        { /*language=CSS*/}
        <style jsx>{`
            .root {
                display: flex;
                justify-content: center;
            }

            .searchField {
                text-align: left;
                padding: 0 0 0 10px;
                margin: 0;
                backgroundColor: #FFF;
                border: none;
                outline: none;
                font-size: 16px;
                flex:1;

            }

            .searchOutline {
                display: flex;
                align-items: center;
                padding-left: 16px;
                background-color: #fefefe;
                border: solid 1px #ddd;
                border-radius: 6px;
                width: 800px;
                height: 44px;
                box-shadow: 1px 1px 1px #bbb;
                cursor: pointer;

            }
        `}
        </style>
        <div className='searchOutline' onClick={() => {

          console.log('searching', searching)
          if (!searching) {
            this.activateSearch()
          }
        }}>

          <SearchIcon style={{ display: !searching ? 'block' : 'none' }}/>
          <div style={{ display: !searching ? 'block' : 'none', paddingLeft: 10, color: '#555' }}>{placeholder}</div>

          <BackIcon onClick={(e) => {
            e.stopPropagation()
            console.log('stopped prop')
            this.deactivateSearch()
          }} style={{ display: searching ? 'block' : 'none' }}/>
          <input
            style={{ display: searching ? 'block' : 'none' }}
            className='searchField'
            ref={this.inputRef}
            value={value}
            onBlur={() => window.setTimeout(this.deactivateSearch, 100)}
            autoFocus={true}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            type="text"
          />


        </div>
      </div>
    </HeaderPortal>

  }

}
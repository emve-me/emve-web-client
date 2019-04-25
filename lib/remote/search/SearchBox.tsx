import React, { Component } from 'react'
import { validate } from 'graphql'
import HeaderPortal from '../../HeaderPortal'
import SearchIcon from '../../icons/SearchIcon'

type TProps = { value: string, placeholder: string, onChange: (value: string) => void }

export class SearchBox extends Component<TProps, { focused: boolean }> {

  state = { focused: false }
  inputRef = React.createRef<HTMLInputElement>()

  keyListener = ({ key, composed, code, target }: KeyboardEvent) => {
    if (key === 'Escape') {
      this.props.onChange('')
    } else if (target !== this.inputRef.current && key.length === 1 && key.match(/[a-z0-9]/i)) {
      this.inputRef.current.focus()
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

  render() {
    const { value, placeholder, onChange } = this.props

    return <HeaderPortal>
      <div className='root'>
        { /*language=CSS*/}
        <style jsx>{`
            .root {
                display: flex;
                justify-content: center;
            }

            .searchField {
                text-align: center;
                padding: 0;
                margin: 0;
                backgroundColor: rgba(255, 255, 255, 0.9);
                width: 100%;
                border: none;
                outline: none;
                font-size: 20px;
                display: none;
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


            }
        `}
        </style>
        <div className='searchOutline'>
          <SearchIcon/>
          <input className='searchField'
                 ref={this.inputRef}


                 value={value}
                 placeholder={placeholder}
                 onChange={e => onChange(e.target.value)}
                 type="text"
          />
        </div>
      </div>
    </HeaderPortal>

  }

}
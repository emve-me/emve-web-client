import { Component, createRef } from 'react'
import SearchIcon from '../../icons/SearchIcon'
import BackIcon from '../../icons/BackIcon'

type TProps = {
  value?: string
  placeholder: string
  onChange?: (value: string) => void
  debounceDelay?: number
  onChangeDebounced?: (value: string) => void
  width?: string
}
type TState = { searching: boolean }

export class SearchBox extends Component<TProps, TState> {
  static defaultProps = {
    debounceDelay: 300
  }

  debounceHandle?: number
  state = { searching: false }
  inputRef = createRef<HTMLInputElement>()

  keyListener = ({ key, composed, code, target }: KeyboardEvent) => {
    if (key === 'Escape') {
      this.deactivateSearch()
    } else if (
      target !== this.inputRef.current &&
      key.length === 1 &&
      key.match(/[a-z0-9]/i)
    ) {
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

  activateSearch = () => {
    this.setState({ searching: true }, () => this.inputRef.current.focus())
  }

  deactivateSearch = () => {
    this.props.onChange('')
    this.setState({ searching: false })
  }

  render() {
    const {
      value,
      width,
      placeholder,
      onChange,
      onChangeDebounced,
      debounceDelay
    } = this.props
    const { searching } = this.state

    const onChangeInlined = ({ target: { value } }: any) => {
      if (onChangeDebounced) {
        if (this.debounceHandle) {
          window.clearTimeout(this.debounceHandle)
        }
        this.debounceHandle = window.setTimeout(() => {
          this.debounceHandle = null
          onChangeDebounced(value)
        }, debounceDelay)
      }
      onChange(value)
    }

    return (
      <>
        {/*language=CSS*/}
        <style jsx>
          {`
            .searchField {
              text-align: left;
              padding: 0 0 0 10px;
              margin: 0;
              background-color: #fff;
              border: none;
              outline: none;
              font-size: 16px;
              flex: 1;
            }

            .searchOutline {
              display: flex;
              align-items: center;
              padding-left: 16px;
              background-color: #fff;
              border: solid 1px #ddd;
              border-radius: 6px;
              width: 800px;
              height: 44px;
              box-shadow: 1px 1px 1px #bbb;
              cursor: pointer;
            }

            @media only screen and (max-width: 905px) {
              .searchOutline {
                border-radius: 6px;
                width: 100%;
                border: none;
                box-shadow: none;
                padding-left: 0px;
              }
            }
          `}
        </style>
        <div
          className="searchOutline"
          onClick={() => {
            if (!searching) {
              this.activateSearch()
            }
          }}>
          <SearchIcon style={{ display: !searching ? 'block' : 'none' }} />
          <div
            style={{
              display: !searching ? 'block' : 'none',
              paddingLeft: 10,
              color: '#555'
            }}>
            {placeholder}
          </div>

          <BackIcon
            onClick={e => {
              e.stopPropagation()
              this.deactivateSearch()
            }}
            style={{ display: searching ? 'block' : 'none' }}
          />
          <input
            style={{ display: searching ? 'block' : 'none' }}
            className="searchField"
            ref={this.inputRef}
            value={value}
            autoFocus={true}
            placeholder={placeholder}
            onChange={onChangeInlined}
            type="text"
          />
        </div>
      </>
    )
  }
}

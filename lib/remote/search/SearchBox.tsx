import React, { Component } from 'react'
import { validate } from 'graphql'

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

    return <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <input
        ref={this.inputRef}

        style={{
          color: !value ? 'transparent' : undefined,
          height: 80,
          textAlign: 'center',
          padding: 0,
          margin: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          width: '100%',
          border: 'none',
          outline: 'none',
          fontSize: 40
        }}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        type="text"
      />
    </div>

  }

}
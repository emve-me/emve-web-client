import React, { Component } from 'react'

type TProps = { value: string, placeholder: string, onChange: (value: string) => void }

export class SearchBox extends Component<TProps> {

  keyListener = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') this.props.onChange('')
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyListener, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyListener, false)
  }

  render() {
    const { value, placeholder, onChange } = this.props

    return <div style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor:'red' }}>
      <input
        style={{
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: 'rgba(255, 255, 0, 0.9)',
          width: '100%',
          border: 'none',
          outline: 'none',
          fontSize: 40
        }}
        value={value}
        autoFocus={true}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        type="text"
      />
    </div>

  }

}
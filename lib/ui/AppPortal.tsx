import { createPortal } from 'react-dom'
import { Component } from 'react'

export default class AppPortal extends Component {
  element?: HTMLElement

  componentDidMount() {
    this.element = document.getElementById('__next')
    this.forceUpdate()
  }

  render() {
    if (!this.element) {
      return false
    }

    return createPortal(this.props.children, this.element)
  }
}

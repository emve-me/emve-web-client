import { createPortal } from 'react-dom'
import { Component } from 'react'


export default class HeaderPortal extends Component {

  element?: HTMLElement

  componentDidMount() {
    this.element = document.getElementById('HEADER_PORTAL')
    this.forceUpdate()
  }

  render() {

    if (!this.element) {
      return false
    }

    return createPortal(
      this.props.children,
      this.element
    )
  }
}
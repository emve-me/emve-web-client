import { createPortal } from 'react-dom'
import { Component } from 'react'


export default class HeaderPortal extends Component<{ headerNode?: HTMLElement }> {

  element?: HTMLElement

  componentDidMount() {
    this.element = document.getElementById('HEADER_PORTAL')
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild)
    }

    this.forceUpdate()
  }

  render() {

    if (!this.element) {
      return false
    }

    return createPortal(
      this.props.children,
      this.props.headerNode || this.element
    )
  }
}
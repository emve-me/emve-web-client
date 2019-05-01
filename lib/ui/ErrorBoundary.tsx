import { Component } from 'react'
import ErrorPage from './ErrorPage'

export default class ErrorBoundary extends Component<
  {},
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage message="Something went wrong." />
    }

    return this.props.children
  }
}

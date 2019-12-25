import { Component, ErrorInfo } from 'react'
import ErrorPage from './ErrorPage'

export default class ErrorBoundary extends Component<
  {},
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
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

import { Component } from 'react'
import HeartIcon from './HeartIcon'

const isBrowser = typeof window !== 'undefined'

export default class HeartIconSpinner extends Component<{}, { ids: number }> {
  state = { ids: 0 }

  render() {
    if (!isBrowser) {
      return false
    }

    const { Spring } = require('react-spring/renderprops')

    return (
      <div>
        <Spring
          reset={true}
          reverse={true}
          onRest={() => this.setState(({ ids }) => ({ ids: ids + 1 }))}
          from={{ deg: 0 }}
          to={{ deg: 360 }}>
          {(props: { deg: number }) => (
            <HeartIcon
              size={65}
              style={{ opacity: 0.9, transform: `rotate(${props.deg}deg)` }}
            />
          )}
        </Spring>
      </div>
    )
  }
}

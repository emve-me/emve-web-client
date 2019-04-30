import Shell from '../lib/Shell'
import JoinChannel from '../lib/join/JoinChannel'

export default () => (
  <Shell visibleOnMobile={false}>
    <JoinChannel />
  </Shell>
)

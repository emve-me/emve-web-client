import HeartIconSpinner from '../icons/HeartIconSpinner'

const LoadingIndicator: React.FC = () => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
    <HeartIconSpinner />
  </div>
)

export default LoadingIndicator

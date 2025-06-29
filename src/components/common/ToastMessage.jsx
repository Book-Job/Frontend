import PropTypes from 'prop-types'
const ToastMessage = ({ children }) => (
  <span
    style={{
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      flex: 1,
      display: 'block',
    }}
  >
    {children}
  </span>
)

ToastMessage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ToastMessage

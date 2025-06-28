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

export default ToastMessage

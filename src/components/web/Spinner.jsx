const Spinner = ({ size = 48, color = 'main-pink' }) => {
  const borderColorClass =
    {
      'main-pink': 'border-main-pink',
      'light-gray': 'border-light-gray',
    }[color] || 'border-main-pink'

  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent ${borderColorClass}`}
      style={{
        width: size,
        height: size,
      }}
    ></div>
  )
}

export default Spinner

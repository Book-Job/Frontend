const Skeleton = ({ width = '100%', height = '16px', borderRadius = '4px', className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 ${className}`}
      style={{ width, height, borderRadius }}
    />
  )
}

export default Skeleton

import { useState } from 'react'

const ImageWithSkeleton = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className='absolute inset-0 bg-gray-300 animate-pulse' />}
      <img
        src={src}
        alt={alt}
        className={`block w-full h-auto transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  )
}

export default ImageWithSkeleton

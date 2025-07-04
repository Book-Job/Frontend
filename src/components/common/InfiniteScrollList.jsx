import { useCallback, useEffect, useRef } from 'react'

const InfiniteScrollList = ({ children, onIntersect, disabled }) => {
  const loaderRef = useRef()

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting && !disabled) {
        onIntersect()
      }
    },
    [onIntersect, disabled],
  )

  useEffect(() => {
    if (disabled) return

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '100px',
      threshold: 0.1,
    })

    const loader = loaderRef.current
    if (loader) observer.observe(loader)

    return () => {
      if (loader) observer.unobserve(loader)
      observer.disconnect()
    }
  }, [handleIntersect, disabled])

  return (
    <>
      {children}
      <div ref={loaderRef} className='w-full' />
    </>
  )
}

export default InfiniteScrollList

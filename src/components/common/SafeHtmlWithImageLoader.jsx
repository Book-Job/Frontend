import { useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import Spinner from '../web/Spinner'

const SafeHtmlWithImageLoader = ({ html }) => {
  const [isImagesLoading, setIsImagesLoading] = useState(true)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!html) return

    const images = contentRef.current?.querySelectorAll('img') || []

    if (images.length === 0) {
      setIsImagesLoading(false)
      return
    }

    let loadedCount = 0
    const handleLoad = () => {
      loadedCount++
      if (loadedCount === images.length) {
        setIsImagesLoading(false)
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        handleLoad()
      } else {
        img.addEventListener('load', handleLoad)
        img.addEventListener('error', handleLoad)
      }
    })

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleLoad)
      })
    }
  }, [html])

  return (
    <div className='text-sm sm:text-base text-left break-words whitespace-pre-line mt-4 mb-10'>
      {isImagesLoading ? (
        <div className='flex justify-center items-center h-[200px]'>
          <Spinner size={48} color='main-pink' />
        </div>
      ) : (
        <div ref={contentRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
      )}
    </div>
  )
}

export default SafeHtmlWithImageLoader

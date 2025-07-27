import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import ImageWithSkeleton from './ImageWithSkeleton'

const ContentRenderer = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html)
  return parse(sanitizedHtml, {
    replace: (domNode) => {
      if (domNode.name === 'img') {
        const { src, alt } = domNode.attribs
        return <ImageWithSkeleton src={src} alt={alt} className='rounded-md' />
      }
    },
  })
}

export default ContentRenderer

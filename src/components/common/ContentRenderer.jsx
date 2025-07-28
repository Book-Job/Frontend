import parse from 'html-react-parser'
import ImageWithSkeleton from './ImageWithSkeleton'

const ContentRenderer = ({ html }) => {
  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {parse(html, {
        replace: (domNode) => {
          if (domNode.name === 'img') {
            const { src, alt } = domNode.attribs
            return <ImageWithSkeleton src={src} alt={alt} className='rounded-md' />
          }
        },
      })}
    </div>
  )
}

export default ContentRenderer

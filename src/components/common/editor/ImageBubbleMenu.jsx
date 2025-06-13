import { BubbleMenu } from '@tiptap/react'
import { FaTimes } from 'react-icons/fa'

const ImageBubbleMenu = ({ editor }) => {
  if (!editor) return null

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => editor.isActive('image')}
      tippyOptions={{
        duration: 100,
        placement: 'top',
        offset: [0, -10],
      }}
    >
      <button
        type='button'
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().deleteSelection().run()
        }}
        className='bg-white text-red-500 hover:text-red-700 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center shadow-md'
        title='이미지 삭제'
      >
        <FaTimes size={12} />
      </button>
    </BubbleMenu>
  )
}

export default ImageBubbleMenu

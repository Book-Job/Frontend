import { FaBold, FaItalic, FaImage } from 'react-icons/fa'

const EditorToolbar = ({ editor }) => {
  if (!editor) return null

  const isActive = (format) => editor.isActive(format)
  const buttonClass = (active) =>
    `px-3 py-1 rounded border ${
      active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
    }`

  return (
    <div className='mb-2 flex gap-2'>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(isActive('bold'))}
      >
        <FaBold />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(isActive('italic'))}
      >
        <FaItalic />
      </button>
      <button
        type='button'
        onClick={() => document.querySelector('#file-input').click()}
        className={buttonClass(false)}
      >
        <FaImage />
      </button>
    </div>
  )
}

export default EditorToolbar

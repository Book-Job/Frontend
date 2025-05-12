import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  const buttonClass = (isActive) =>
    `px-3 py-1 rounded border text-sm transition 
    ${isActive ? 'bg-main-pink text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`

  return (
    <div className='flex flex-wrap gap-2 mb-4'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive('bold'))}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive('italic'))}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonClass(editor.isActive('strike'))}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={buttonClass(editor.isActive('paragraph'))}
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive('heading', { level: 1 }))}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive('heading', { level: 2 }))}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive('bulletList'))}
      >
        • List
      </button>
    </div>
  )
}

const TiptapEditor = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '내용을 작성해주세요',
      }),
    ],
    content: value || '',
  })

  useEffect(() => {
    if (editor) {
      editor.on('update', () => {
        onChange?.(editor.getHTML())
      })
    }
  }, [editor, onChange])

  return (
    <div className='w-full mx-auto p-4 bg-white border border-dark-gray rounded'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className='focus:outline-none' />
    </div>
  )
}
export default TiptapEditor

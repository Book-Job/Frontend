import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const styleMap = {
  FONT_SIZE_8: { fontSize: '8px' },
  FONT_SIZE_10: { fontSize: '10px' },
  FONT_SIZE_12: { fontSize: '12px' },
  FONT_SIZE_14: { fontSize: '14px' },
  FONT_SIZE_16: { fontSize: '16px' },
  FONT_SIZE_18: { fontSize: '18px' },
  FONT_SIZE_24: { fontSize: '24px' },
  FONT_SIZE_30: { fontSize: '30px' },
  FONT_SIZE_36: { fontSize: '36px' },
}

const WriteEditor = ({ editorState, onEditorStateChange, placeholder }) => {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      placeholder={placeholder}
      wrapperClassName='demo-wrapper'
      editorClassName='demo-editor'
      customStyleMap={styleMap}
      toolbar={{
        options: ['inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
        fontSize: {
          options: [8, 10, 12, 14, 16, 18, 24, 30, 36],
        },
      }}
    />
  )
}

export default WriteEditor

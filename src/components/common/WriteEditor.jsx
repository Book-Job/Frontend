import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const WriteEditor = ({ editorState, onEditorStateChange, placeholder }) => {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      placeholder={placeholder}
      wrapperClassName='demo-wrapper'
      editorClassName='demo-editor'
    />
  )
}

export default WriteEditor

import { EditorState, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import DOMPurify from 'dompurify'

export function htmlToEditorState(html) {
  if (!html) return EditorState.createEmpty()

  const cleanHtml = DOMPurify.sanitize(html)

  const blocksFromHtml = htmlToDraft(cleanHtml)
  const { contentBlocks, entityMap } = blocksFromHtml
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
  return EditorState.createWithContent(contentState)
}

import { EditorState, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import DOMPurify from 'dompurify'

export function htmlToEditorState(html) {
  if (!html) return EditorState.createEmpty()

  try {
    const cleanHtml = DOMPurify.sanitize(html)
    const blocksFromHtml = htmlToDraft(cleanHtml)

    if (!blocksFromHtml) {
      console.warn('주의:', cleanHtml)
      return EditorState.createEmpty()
    }

    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
    return EditorState.createWithContent(contentState)
  } catch (error) {
    console.error('오류', error, '원래 HTML:', html)
    return EditorState.createEmpty()
  }
}

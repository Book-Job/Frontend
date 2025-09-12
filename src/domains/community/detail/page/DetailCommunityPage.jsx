import { useParams, useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import { useState, useEffect, useRef } from 'react'
import useDetailPost from '../hook/useDetailPost'
import Spinner from '../../../../components/web/Spinner'
import MobileShare from '../../../../components/app/MobileShare'
import viewPink from '../../../../assets/icons/common/common_view_pink.svg'
import comment from '../../../../assets/icons/common/comment.svg'
import share from '../../../../assets/icons/common/common_share.svg'
import LastFormLine from '../../../job/common/components/LastFormLine'
import CommentHeader from '../../comment/components/CommentHeader'
import CommentForm from '../../comment/components/CommentForm'
import CommentList from '../../comment/components/CommentList'
import { deletePost } from '../../service/postService'
import useCommentStore from '../../comment/store/useCommentStore'
import RelatedPosts from '../components/RelatedPosts'
import ToastService from '../../../../services/toast/ToastService'
import WriteEditor from '../../../../components/common/editor/WriteEditor'
import useEditPost from '../hook/useEditPost'
import { saveTOStorage } from '../../../my/detail/components/saveToStorage'
import ContentRenderer from '../../../../components/common/ContentRenderer'
import LikeCount from '../../../../components/common/LikeCount'
const DetailCommunityPage = () => {
  const { id } = useParams()
  const { post, loading, error, setPost } = useDetailPost(id)
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [isCommentOpen, setIsCommentOpen] = useState(true)
  const comments = useCommentStore((state) => state.comments)
  const fetchComments = useCommentStore((state) => state.fetchComments)
  const currentUrl = window.location.href
  const hasSaved = useRef(false)
  const hasFetched = useRef(false)
  const {
    content,
    setContent,
    loading: editLoading,
    error: editError,
    handleSubmit,
  } = useEditPost(id, post?.text || '')

  useEffect(() => {
    hasFetched.current = false
  }, [id])

  useEffect(() => {
    if (!id) return
    if (!hasFetched.current) {
      fetchComments(id)
      hasFetched.current = true
    }
  }, [id, fetchComments])

  useEffect(() => {
    if (post && !hasSaved.current) {
      saveTOStorage(post, id, 'community')
      hasSaved.current = true
    }
    return () => {
      hasSaved.current = false
    }
  }, [post, id])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }

  const handleDeleteClick = async () => {
    const confirmed = window.confirm('삭제 후 복원이 불가능합니다. 정말 삭제하시겠습니까?')
    if (!confirmed) return

    try {
      await deletePost(id)
      ToastService.success('성공적으로 삭제되었습니다.')
      navigate(ROUTER_PATHS.COMMUNITY)
    } catch (error) {
      ToastService.error('삭제 중 오류 발생')
      console.error(error)
    }
  }

  const handleEditClick = () => {
    setContent(post.text || '')
    setIsEditing(true)
  }
  const handleCancelEdit = () => setIsEditing(false)

  const onSaveSuccess = (newText) => {
    setPost((prevPost) => ({
      ...prevPost,
      text: newText,
    }))
  }

  if (error) return <div className='mt-10 text-center text-error-red'>오류가 발생했어요.</div>
  if (!post)
    return <div className='mt-10 text-center text-dark-gray'>게시글이 존재하지 않아요.</div>

  return (
    <div className='w-full max-w-[940px] mx-auto '>
      <h1 className='text-2xl sm:text-3xl md:text-[35px] font-bold text-left mb-4 break-words'>
        {post.title}
      </h1>
      <div className='flex items-center justify-between mb-2 text-dark-gray'>
        <div className='text-[15px] sm:text-[20px] break-words'>{post.nickname}</div>
        <div className='text-[14px] sm:text-[16px] break-words'>{post.createdAt.split('T')[0]}</div>
      </div>
      {post && (
        <LikeCount
          id={id}
          initialCount={post.likeCount ?? 0}
          initialActive={false}
          className='mt-2 text-dark-gray'
        />
      )}
      {post?.isWriter ? (
        <div className='flex justify-end gap-4 my-2'>
          {!isEditing ? (
            <>
              <button className='text-dark-gray text-[13px]' onClick={handleEditClick}>
                수정
              </button>
              <button className='text-dark-gray text-[13px]' onClick={handleDeleteClick}>
                삭제
              </button>
            </>
          ) : (
            <>
              <button
                className='text-dark-gray text-[13px]'
                onClick={async (e) => {
                  await handleSubmit(e)
                  setIsEditing(false)
                  onSaveSuccess(content)
                }}
                disabled={editLoading}
              >
                저장
              </button>
              <button className='text-dark-gray text-[13px]' onClick={handleCancelEdit}>
                취소
              </button>
            </>
          )}
        </div>
      ) : null}
      <LastFormLine />

      <div className='flex flex-wrap justify-end gap-2 mb-4 ml-0 sm:ml-5'>
        <MobileShare label={post.viewCount.toString()} icon={viewPink} textColor='text-main-pink' />
        <MobileShare label={comments.length.toString()} icon={comment} textColor='text-dark-gray' />
        <MobileShare
          label='공유'
          icon={share}
          textColor='text-dark-gray'
          weblink={currentUrl}
          title={post.title}
          post={post}
          isShare={true}
        />
      </div>
      <div className='mb-10'>
        {isEditing ? (
          <WriteEditor
            initialContent={content}
            onChange={setContent}
            onAddFileId={(fileId) => {}}
          />
        ) : (
          <div className='text-[16px] leading-relaxed text-left break-words whitespace-pre-line'>
            <ContentRenderer html={post.text} />
          </div>
        )}
      </div>

      <div className='w-full h-[1px] bg-light-gray mb-[20px]' />

      <div className='w-full max-w-full sm:max-w-[940px] mx-auto'>
        <CommentHeader
          isOpen={isCommentOpen}
          toggleOpen={() => setIsCommentOpen((prev) => !prev)}
          commentCount={comments.length}
        />
        <CommentForm boardId={id} onCommentAdded={() => fetchComments(id)} />
        {isCommentOpen && <CommentList boardId={id} />}
        <LastFormLine />
        <h2 className='flex self-start my-5 text-lg font-bold sm:text-xl'>관련 글</h2>
        <RelatedPosts currentId={id} />
      </div>
    </div>
  )
}

export default DetailCommunityPage

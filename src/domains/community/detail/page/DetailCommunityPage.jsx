import { useParams, useNavigate } from 'react-router-dom'
import useAuthStore from '../../../../store/login/useAuthStore'
import { useState, useEffect } from 'react'
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
import { deletePost, editPost } from '../../service/postService'
import { getAllComment } from '../../service/commentService'

const DetailCommunityPage = () => {
  const { user } = useAuthStore()
  const { id } = useParams()
  const { post, loading, error } = useDetailPost(id)
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editedPost, setEditedPost] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (post) {
      setEditedPost(post.text)
    }
  }, [post])

  const fetchComments = async () => {
    try {
      if (!id) return
      const fetchedComments = await getAllComment(id)
      console.log('불러온 댓글 목록:', fetchedComments)
      setComments(fetchedComments)
    } catch (err) {
      console.error('댓글 불러오기 실패:', err)
      setComments([])
    }
  }

  useEffect(() => {
    if (id) fetchComments()
  }, [id])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }

  const handleDeleteClick = async () => {
    try {
      await deletePost(id)
      alert('성공적으로 삭제되었습니다.')
      navigate('/community')
    } catch (err) {
      alert('삭제 중 오류 발생')
      console.error(err)
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleUpdateSubmit = async () => {
    try {
      await editPost(id, editedPost)
      alert('게시글이 수정되었습니다.')
      setIsEditing(false)
    } catch (err) {
      console.error('수정 중 오류 발생:', err)
    }
  }

  const handleBlockUserClick = () => {
    alert('이 사용자를 차단합니다.')
  }
  console.log('post:', post)
  console.log('post.isWriter:', post?.isWriter, typeof post?.isWriter)

  if (error) return <div className='text-center text-red-500 mt-10'>오류가 발생했어요.</div>
  if (!post) return <div className='text-center text-gray-500 mt-10'>게시글이 존재하지 않아요.</div>

  return (
    <div className='px-[250px] py-[50px]'>
      <h1 className='text-[35px] font-bold text-left mb-4'>{post.title}</h1>
      <div className='text-[15px] text-gray-600 mb-2 text-left'>{post.nickname}</div>

      {post?.isWriter ? (
        <div className='flex gap-4 mt-4 mb-4 justify-end'>
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
              <button className='text-dark-gray text-[13px]' onClick={handleUpdateSubmit}>
                저장
              </button>
              <button className='text-dark-gray text-[13px]' onClick={() => setIsEditing(false)}>
                취소
              </button>
            </>
          )}
        </div>
      ) : (
        <div className='flex gap-4 mt-4 mb-4 justify-end'>
          <button className='text-dark-gray text-[13px]' onClick={handleBlockUserClick}>
            차단
          </button>
        </div>
      )}

      <LastFormLine />

      <div className='flex gap-3 mt-2 mb-4 ml-5 justify-end'>
        <MobileShare label={post.viewCount.toString()} icon={viewPink} textColor='text-[#E36397]' />
        <MobileShare
          label={post.commentCount.toString()}
          icon={comment}
          textColor='text-[#8E8E8E]'
        />
        <MobileShare label='공유' icon={share} textColor='text-[#8E8E8E]' />
      </div>
      <div className='mb-10'>
        {isEditing ? (
          <textarea
            className='w-full h-[200px] p-4 border border-gray-300'
            value={editedPost}
            onChange={(e) => setEditedPost(e.target.value)}
          />
        ) : (
          editedPost.replace(/<[^>]*>/g, '')
        )}
      </div>

      <div className='w-full sm:w-[870px] h-[1px] bg-light-gray mb-[20px]' />

      <div>
        <CommentHeader />
      </div>

      <CommentForm boardId={id} onCommentAdded={fetchComments} />
      <CommentList comments={comments} />
      <LastFormLine />
    </div>
  )
}

export default DetailCommunityPage

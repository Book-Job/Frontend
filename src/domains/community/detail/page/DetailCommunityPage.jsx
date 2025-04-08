import { useParams } from 'react-router-dom'
import useDetailPost from '../hook/useDetailPost'
import Spinner from '../../../components/web/Spinner'
import MobileShare from '../../../../components/app/MobileShare'
import viewPink from '../../../../assets/icons/common/common_view_pink.svg'
import comment from '../../../../assets/icons/common/comment.svg'
import share from '../../../../assets/icons/common/common_share.svg'
import LastFormLine from '../../../job/common/components/LastFormLine'
import CommentHeader from '../../comment/components/CommentHeader'
import CommentForm from '../../comment/components/CommentForm'
import FreeBoard from '../../../../components/web/FreeBoard'

const DetailCommunityPage = () => {
  const { id } = useParams()
  const { post, loading, error } = useDetailPost(id)

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }

  if (error) return <div className='text-center text-red-500 mt-10'>오류가 발생했어요.</div>
  if (!post) return <div className='text-center text-gray-500 mt-10'>게시글이 존재하지 않아요.</div>

  return (
    <div className='px-[250px] py-[50px]'>
      <h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
      <div className='text-sm text-gray-600 mb-2'>{post.nickname}</div>

      {/* 수정 / 삭제 버튼 */}
      <div className='flex gap-4 mb-2'>
        <button className='text-blue-500'>수정</button>
        <button className='text-red-500'>삭제</button>
      </div>

      {/* 공유/조회/댓글 정보 */}
      <div className='flex gap-4 mb-6'>
        <MobileShare label={post.viewCount.toString()} icon={viewPink} textColor='text-[#E36397]' />
        <MobileShare
          label={post.commentCount.toString()}
          icon={comment}
          textColor='text-[#8E8E8E]'
        />
        <MobileShare label='공유' icon={share} textColor='text-[#8E8E8E]' />
      </div>

      <hr className='mt-6 mb-6' />

      <div className='mb-6'>{post.text}</div>
      <LastFormLine />
      <div>
        <CommentHeader />
      </div>
      <CommentForm />
      <LastFormLine />
      <span>관련글</span>
      {relatedPosts.map((post) => (
        <FreeBoard
          key={post.boardId}
          title={post.title}
          content={post.text}
          name={post.nickname}
          date={new Date(post.createdAt).toLocaleDateString()}
          comment1={post.commentCount}
          view1={post.viewCount}
          onNameClick={() => console.log(`${post.nickname}의 게시글 보기`)}
        />
      ))}
    </div>
  )
}

export default DetailCommunityPage

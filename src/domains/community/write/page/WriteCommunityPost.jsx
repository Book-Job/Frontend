import WriteFormLine from '../../../../components/web/WriteFormLine'
import LastFormLine from '../../../job/common/components/LastFormLine'
import Button from '../../../../components/web/Button'
import PinkButton from '../../../../components/web/PinkButton'
import WriteCommunityPostForm from '../components/WriteCommunityPostForm'
const WriteCommunityPost = () => {
  return (
    <div className='flex flex-col gap-4 mx-[250px]'>
      <h1 className='text-[28px] font-bold self-start mt-[50px]'>자유게시판 글 등록</h1>
      <div className='text-[15px] font-bold text-red-500 self-end'>닉네임 수정이 가능합니다.</div>
      <WriteFormLine />
      <WriteCommunityPostForm />
      <LastFormLine />
      <div className='flex justify-end mb-[131px]'>
        <Button size='small' label='임시저장' className='mr-[14px]' />
        <PinkButton label='등록' type='submit' form='community-post-form' />
      </div>
    </div>
  )
}
export default WriteCommunityPost

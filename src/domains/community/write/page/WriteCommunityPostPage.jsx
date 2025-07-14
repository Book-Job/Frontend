import WriteFormLine from '../../../../components/web/WriteFormLine'
import LastFormLine from '../../../job/common/components/LastFormLine'
import Button from '../../../../components/web/Button'
import WriteCommunityPostForm from '../components/WriteCommunityPostForm'
import PinkButton from '../../../../components/web/PinkButton'

const WriteCommunityPost = () => {
  return (
    <main className='flex flex-col gap-4 max-w-[1440px] w-full px-4 sm:px-10 lg:px-[250px] mx-auto'>
      <h1 className='hidden sm:block text-3xl font-bold self-start mt-[50px]'>
        자유게시판 글 등록
      </h1>
      <p className='text-sm font-bold text-error-red self-end'>닉네임 수정이 가능합니다.</p>
      <section>
        <WriteFormLine />
        <WriteCommunityPostForm />
        <LastFormLine />
      </section>
      <section className='flex justify-end'>
        <Button
          size='small'
          label='임시저장'
          className='mr-[14px]'
          onClick={() => {
            const form = document.getElementById('community-post-form')
            form.querySelector('button[hidden]').click()
          }}
        />
        <PinkButton label='등록' type='submit' form='community-post-form' />
      </section>
    </main>
  )
}

export default WriteCommunityPost

import useIsMobile from '../../../../hooks/header/useIsMobile'
import useBoardStore from '../../../../store/mypage/useBoardStore'
import PageTitle from '../../../Find/common/components/PageTitle'

const MyPostHead = () => {
  const { choiceBoard, setChoiceBoard } = useBoardStore()
  const isMobile = useIsMobile()

  return (
    <div className='flex flex-col items-center mt-10'>
      {isMobile ? '' : <PageTitle title={'내가 작성한 글'} />}
      <div className='bg-[#F4F6FA] flex justify-center sm:gap-[130px] gap-10 sm:h-[52px] h-[38px] sm:w-[492px] w-[300px] items-center sm:text-xl text-base font-bold rounded-full'>
        <button
          className={choiceBoard === '구인구직' ? 'text-main-pink' : 'text-dark-gray'}
          onClick={() => setChoiceBoard('구인구직')}
        >
          구인 | 구직
        </button>
        <button
          className={choiceBoard === '자유게시판' ? 'text-main-pink' : 'text-dark-gray'}
          onClick={() => setChoiceBoard('자유게시판')}
        >
          자유게시판
        </button>
      </div>
    </div>
  )
}

export default MyPostHead

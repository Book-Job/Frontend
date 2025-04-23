import useBoardStore from '../../../../store/mypage/useBoardStore'

const MyPostHead = () => {
  const { choiceBoard, setChoiceBoard } = useBoardStore()

  return (
    <div className='flex flex-col items-center'>
      <div className='sm:text-[30px] font-bold mb-[30px] text-[20px]'>내가 작성한 글</div>
      <div className='bg-[#F4F6FA] flex justify-center sm:gap-[130px] gap-10 sm:h-[52px] h-[38px] sm:w-[492px] w-[300px] items-center sm:text-xl text-base font-bold rounded-full'>
        <button
          className={choiceBoard === 'job' ? 'text-main-pink' : 'text-dark-gray'}
          onClick={() => setChoiceBoard('job')}
        >
          구인 | 구직
        </button>
        <button
          className={choiceBoard === 'free' ? 'text-main-pink' : 'text-dark-gray'}
          onClick={() => setChoiceBoard('free')}
        >
          자유게시판
        </button>
      </div>
    </div>
  )
}

export default MyPostHead

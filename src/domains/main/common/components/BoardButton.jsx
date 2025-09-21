import commonTime from '../../../../assets/icons/common/common_time.svg'

const BoardButton = ({ onBoardSelect, selectedBoard, handleRefresh }) => {
  const boardButton = [{ name: '구인구직' }, { name: '자유' }, { name: '최신글' }]
  const today = new Date()
  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일`

  const handleClick = (name) => {
    onBoardSelect(name === '자유' ? '자유게시판' : name === '구인구직' ? '구인구직' : '최신글')
  }
  return (
    <div className='flex justify-center w-full max-w-[940px] mx-auto'>
      <div className='items-end w-full'>
        <p className='flex justify-center w-full gap-3'>
          {boardButton.map(({ name }, index) => {
            const isSelected =
              (name === '자유' && selectedBoard === '자유게시판') ||
              (name === '구인구직' && selectedBoard === '구인구직') ||
              (name === '최신글' && selectedBoard === '최신글')
            return (
              <button
                key={index}
                onClick={() => handleClick(name)}
                className={`sm:w-[157px] w-[100px] sm:h-[47px] h-[32px]  rounded-full sm:text-2xl  text-lg font-bold ${
                  isSelected ? 'bg-main-pink text-white' : 'text-black'
                }`}
              >
                {name}
              </button>
            )
          })}
        </p>
        <button
          onClick={() => {
            handleRefresh()
          }}
          className='flex items-center justify-end w-full mt-3 bg-blend-darken'
          title='최신 정보로 업데이트'
        >
          <div className='w-3 h-3 mr-1 mb-[1px] sm:w-4 sm:h-4'>
            <img src={commonTime} alt='commonTime' className='w-4 h-4' />
          </div>
          <p className='text-sm font-semibold sm:text-base text-dark-gray'>{formattedDate} 기준</p>
        </button>
      </div>
    </div>
  )
}

export default BoardButton

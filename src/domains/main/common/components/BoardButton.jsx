import { useNavigate } from 'react-router-dom'
import commonTime from '../../../../assets/icons/common/common_time.svg'

const BoardButton = ({ onBoardSelect, selectedBoard, handleRefresh }) => {
  const boardButton = [{ name: '자유' }, { name: '구인구직' }]
  const navigate = useNavigate()
  const today = new Date()
  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일`

  const handleClick = (path, name) => {
    navigate(path)
    onBoardSelect(name === '자유' ? '자유게시판' : '구인구직')
  }
  return (
    <div className='flex justify-center w-full max-w-[940px] mx-auto'>
      <div className='items-end w-full'>
        <p className='flex justify-center w-full gap-3'>
          {boardButton.map(({ name, path }, index) => {
            const isSelected =
              (name === '자유' && selectedBoard === '자유게시판') ||
              (name === '구인구직' && selectedBoard === '구인구직')
            return (
              <button
                key={index}
                onClick={() => handleClick(path, name)}
                className={`sm:w-[157px] w-[100px] sm:h-[47px] h-[37px] border rounded-full sm:text-2xl text-lg ${
                  isSelected ? 'bg-main-pink text-white' : 'bg-light-gray text-black'
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
          className='flex justify-end w-full mt-1 '
        >
          <div className='w-4 h-4 mr-1 sm:w-5 sm:h-5'>
            <img src={commonTime} alt='commonTime' />
          </div>
          <p className='text-sm font-semibold sm:text-base text-dark-gray hover:text-light-gray'>
            {formattedDate} 기준
          </p>
        </button>
      </div>
    </div>
  )
}

export default BoardButton

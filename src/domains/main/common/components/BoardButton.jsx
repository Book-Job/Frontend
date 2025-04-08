import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import commonTime from '../../../../assets/icons/common/common_time.svg'

const BoardButton = ({ onBoardSelect, selectedBoard }) => {
  const boardButton = [
    {
      name: '자유',
      // path: ROUTER_PATHS.LOGIN_MAIN,
    },
    {
      name: '구인구직',
      // path: '/',
    },
  ]
  const navigate = useNavigate()
  // const today = new Date().toISOString().split('T')[0]
  const today = new Date()
  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일`

  const handleClick = (path, name) => {
    navigate(path)
    onBoardSelect(name === '자유' ? '자유게시판' : '구인구직') // 버튼 이름에 따라 보드 이름 설정
  }
  return (
    <div className='w-[940px] '>
      <div className='relative flex items-end justify-center'>
        <p className='flex gap-3'>
          {boardButton.map(({ name, path }, index) => {
            const isSelected =
              (name === '자유' && selectedBoard === '자유게시판') ||
              (name === '구인구직' && selectedBoard === '구인구직')
            return (
              <button
                key={index}
                // onClick={() => navigate(path)}
                onClick={() => handleClick(path, name)}
                className={`w-[157px] h-[47px] border rounded-full text-2xl ${
                  isSelected ? 'bg-main-color-pink text-white' : 'bg-light-gray text-black'
                }`}
              >
                {name}
              </button>
            )
          })}
        </p>
        <div className='absolute right-0 flex'>
          <div className='w-5 h-5 mr-1'>
            <img src={commonTime} alt='commonTime' />
          </div>
          <p className='text-base font-semibold text-gray-8e8e8e'>{formattedDate} 기준</p>
        </div>
      </div>
    </div>
  )
}

export default BoardButton

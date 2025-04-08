import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import commonTime from '../../../../assets/icons/common/common_time.svg'

const BoardButton = () => {
  const boardButton = [
    {
      name: '자유',
      path: ROUTER_PATHS.LOGIN_MAIN,
    },
    {
      name: '구인구직',
      path: '/',
    },
  ]
  const navigate = useNavigate()
  // const today = new Date().toISOString().split('T')[0]
  const today = new Date()
  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일`
  return (
    <div className='w-[940px] '>
      <div className='relative flex items-end justify-center'>
        <p className='flex gap-3'>
          {boardButton.map(({ name, path }, index) => {
            return (
              <button
                key={index}
                onClick={() => navigate(path)}
                className='bg-light-gray w-[157px] h-[47px] border rounded-full text-2xl'
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

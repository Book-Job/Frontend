import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import useIsMobile from '../../../../hooks/header/useIsMobile'

const MyData = ({ userID, email }) => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  return (
    <div className='bg-[#F0F0F0]'>
      <div className='flex flex-row items-center justify-between sm:h-[275px] h-[190px] sm:max-w-[940px] mx-auto sm:px-10 px-7 py-7'>
        <div className='flex flex-col'>
          {isMobile ? (
            <div className='flex flex-col items-start '>
              <span className='text-2xl font-bold sm:text-4xl'>{userID}님,</span>
              <span className='sm:text-[20px] text-base'>안녕하세요</span>
            </div>
          ) : (
            <div className='flex items-end '>
              <span className='text-2xl font-bold sm:text-4xl'>{userID}님,</span>
              <span className='sm:text-[20px] text-base'>안녕하세요</span>
            </div>
          )}
          <div className='flex mt-5 sm:mt-8 sm:text-3xl'>{email}</div>
        </div>
        <div className='flex'>
          <button
            className='border border-dark-gray rounded-[5px] sm:w-[254px] sm:h-[66px] w-28 h-10 font-bold sm:text-2xl text-base transition
        hover:shadow-inner'
            onClick={() => navigate(ROUTER_PATHS.MY_EDIT_PROFILE)}
          >
            프로필 수정
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyData

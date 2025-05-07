import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'

const MyData = ({ userID, email }) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='flex flex-row items-center justify-between bg-[#F0F0F0] w-full sm:h-[275px] h-[190px] sm:pl-16 sm:pr-12 pl-7 pr-5 py-7'>
        <div className='flex flex-col'>
          <div className='flex items-end'>
            <p className='text-2xl font-bold sm:text-4xl'>{userID}님,</p>
            <p className='sm:text-[20px] text-base'>안녕하세요</p>
          </div>
          <div className='flex mt-8 sm:text-3xl'>{email}</div>
        </div>
        <div className='flex'>
          <button
            className='border border-dark-gray rounded-[5px] sm:w-[254px] sm:h-[66px] w-28 h-10 font-bold sm:text-2xl text-base'
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

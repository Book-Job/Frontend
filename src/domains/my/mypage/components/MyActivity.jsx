import pencil from '../../../../assets/icons/common/common_pencil.svg'
import scrap from '../../../../assets/icons/common/common_scrap.svg'
import latest from '../../../../assets/icons/common/common_latest.svg'
import hand from '../../../../assets/icons/common/common_hand.svg'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import { useNavigate } from 'react-router-dom'
const MyActivity = () => {
  const activities = [
    { icon: pencil, text: '내가 작성한 글', alt: 'pencil', link: ROUTER_PATHS.FIND_PW },
    { icon: hand, text: '임시 저장 글글', alt: 'hand', link: ROUTER_PATHS.FIND_PW },
    { icon: scrap, text: '스크랩', alt: 'scrap', link: ROUTER_PATHS.FIND_PW },
    { icon: latest, text: '최근본 목록', alt: 'latest', link: ROUTER_PATHS.FIND_PW },
  ]

  const navigate = useNavigate()

  return (
    <div className='pt-5 sm:pt-20 sm:px-16 px-7 '>
      <p className='flex justify-start mb-8 text-2xl font-bold sm:mb-12 sm:text-4xl'>나의 활동</p>
      <div className='flex flex-col gap-12 sm:flex-row justify-evenly'>
        {activities.map((activity, idex) => (
          <button
            key={idex}
            className='flex items-center gap-8 sm:flex-col'
            onClick={() => navigate(activity.link)}
          >
            <div className='bg-[#FDF8FA] sm:w-[100px] sm:h-[100px] w-[70px] h-[70px] rounded-full items-center flex justify-center '>
              <img src={activity.icon} alt={activity.alt} className='object-contain w-1/2 h-1/2' />
            </div>
            <p className='text-lg font-medium sm:text-2xl'>{activity.text}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MyActivity

import pencil from '../../../../assets/icons/common/common_pencil.svg'
import scrap from '../../../../assets/icons/common/common_scrap.svg'
import latest from '../../../../assets/icons/common/common_latest.svg'
import hand from '../../../../assets/icons/common/common_hand.svg'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import { useNavigate } from 'react-router-dom'
const MyActivity = () => {
  const activities = [
    { icon: pencil, text: '내가 작성한 글', alt: 'pencil', link: ROUTER_PATHS.MY_POST },
    { icon: hand, text: '임시 저장 글', alt: 'hand', link: ROUTER_PATHS.MY_DRAFTS },
    { icon: scrap, text: '스크랩', alt: 'scrap', link: ROUTER_PATHS.MY_SCRAP },
    { icon: latest, text: '최근 본 목록', alt: 'latest', link: ROUTER_PATHS.MY_RECENT_LIST },
  ]

  const navigate = useNavigate()

  return (
    <div className='sm:max-w-[940px] mx-auto sm:px-10 px-7 pt-5 sm:pt-20'>
      <p className='flex justify-start mb-8 text-2xl font-bold sm:mb-12 sm:text-4xl'>나의 활동</p>
      <div className='flex flex-col justify-between gap-12 sm:flex-row '>
        {activities.map((activity, idex) => (
          <button
            key={idex}
            className='flex items-center gap-8 sm:flex-col'
            onClick={() => navigate(activity.link)}
          >
            <div className='bg-[#FDF8FA] sm:w-[100px] sm:h-[100px] w-[70px] h-[70px] rounded-full items-center flex justify-center hover:scale-110 transition'>
              <img src={activity.icon} alt={activity.alt} className='object-contain w-1/2 h-1/2' />
            </div>
            <p className='text-lg font-medium transition sm:text-2xl '>{activity.text}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MyActivity

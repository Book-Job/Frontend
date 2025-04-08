import { useNavigate } from 'react-router-dom'
import issueFire from '../../../../assets/icons/common/common_issue_fire.svg'
import comment from '../../../../assets/icons/common/comment.svg'
import ROUTER_PATHS from '../../../../routes/RouterPath'
const BestList = ({boardName}) => {
  const bestList = [
    {
      title: '오늘 회사에서 제안 받았어요',
      path: '/',
      commentNum: 123,
    },
    {
      title: '여기 어때요?',
      path: ROUTER_PATHS.LOGIN_MAIN,
      commentNum: 123,
    },
    {
      title: '우리회사 대환장파티 열렸다',
      path: '/',
      commentNum: 123,
    },
    {
      title: '영상정보처리기기 운영/관리 방침',
      path: '/',
      commentNum: 123,
    },
    {
      title: '오늘 회사에서 제안 받았어요',
      path: '/',
      commentNum: 123,
    },
    {
      title: '여기 어때요?',
      path: ROUTER_PATHS.LOGIN_MAIN,
      commentNum: 123,
    },
    {
      title: '우리회사 대환장파티 열렸다',
      path: '/',
      commentNum: 123,
    },
    {
      title: '영상정보처리기기 운영/관리 방침',
      path: '/',
      commentNum: 123,
    },
    {
      title: '오늘 회사에서 제안 받았어요',
      path: '/',
      commentNum: 123,
    },
    {
      title: '여기 어때요?',
      path: ROUTER_PATHS.LOGIN_MAIN,
      commentNum: 123,
    },
    {
      title: '우리회사 대환장파티 열렸다',
      path: '/',
      commentNum: 123,
    },
    {
      title: '영상정보처리기기 운영/관리 방침',
      path: '/',
      commentNum: 123,
    },
  ]
  const navigate = useNavigate()
  return (
    <div className='flex flex-col w-[940px]'>
      <div className='flex mb-12'>
        <img src={issueFire} alt='issueFire' className='mr-5 w-11 h-11' />
        <div className='text-3xl font-bold'>{boardName} 베스트</div>
      </div>
      <div className='grid grid-cols-2 gap-y-4 gap-x-20'>
        {bestList.map(({ title, path, commentNum }, index) => {
          return (
            <div key={index} className='flex items-center'>
              <p className='w-5 text-[20px] font-medium'>{index + 1}.</p>
              <div className='flex text-[20px] font-medium items-center justify-between w-full ml-3'>
                <button className='flex justify-start' onClick={() => navigate(path)}>
                  {title}
                </button>
                <div className='flex flex-row items-center'>
                  <img src={comment} alt='comment' className='w-[19px] h-[17px] mr-2' />
                  {commentNum}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='w-[2px] h-auto bg-light-gray'></div>
    </div>
  )
}

export default BestList

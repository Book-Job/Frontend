import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'

const ServerErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='flex flex-col items-center justify-center text-center px-4'>
      <h1 className='text-2xl font-bold mb-4'>서버 점검 중입니다 🔧</h1>
      <p className='text-dark-gray mb-8'>잠시 후 다시 시도해주세요.</p>
      <button
        onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
        className='px-6 py-2 bg-main-pink text-white rounded-lg hover:bg-hover-pink transition-colors'
        aria-label='홈으로 이동하기'
      >
        홈으로 이동
      </button>
    </section>
  )
}
export default ServerErrorPage

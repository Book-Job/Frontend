import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='flex flex-col items-center justify-center text-center px-4'>
      <h1 className='text-2xl font-bold mb-4'>404 - 페이지를 찾을 수 없습니다 😢</h1>
      <p className='text-dark-gray mb-8'>주소가 잘못되었거나, 존재하지 않는 페이지입니다.</p>
      <button
        onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
        className='px-6 py-2 bg-main-pink text-white rounded-lg hover:bg-pink-500 transition-colors'
        aria-label='홈으로 이동하기'
      >
        홈으로 이동
      </button>
    </section>
  )
}

export default ErrorPage

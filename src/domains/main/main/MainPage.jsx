import { useEffect, useState } from 'react'
import BestList from '../common/components/BestList'
import BoardButton from '../common/components/BoardButton'
import useBestStore from '../../../store/main/useBestStore'
import Spinner from '../../../components/web/Spinner'
import Banner from '../../../components/common/Banner'
import SeoHelmet from '../../../components/common/SeoHelmet'
import SurveyModal from '../common/components/SurveyModal'
import useAuthStore from '../../../store/login/useAuthStore'
import ROUTER_PATHS from '../../../routes/RouterPath'
const MainPage = () => {
  const { isAuthenticated } = useAuthStore()
  const [selectedBoard, setSelectedBoard] = useState('구인구직')
  const [isSurveyOpen, setIsSurveyOpen] = useState(false)

  const {
    freeBest,
    jobBest,
    isFreeLoading,
    isJobLoading,
    freeError,
    jobError,
    fetchFreeBest,
    fetchJobBest,
  } = useBestStore()

  const handleBoardSelect = (boardName) => {
    setSelectedBoard(boardName)
  }

  const handleRefresh = () => {
    fetchFreeBest(true)
    fetchJobBest(true)
  }

  useEffect(() => {
    if (!isAuthenticated) return

    const today = new Date().toDateString()
    const hideUntil = localStorage.getItem('hideSurveyPopupUntil')

    if (hideUntil !== today) {
      const timer = setTimeout(() => {
        setIsSurveyOpen(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated])

  const handleDoNotShowToday = () => {
    const today = new Date().toDateString()
    localStorage.setItem('hideSurveyPopupUntil', today)
    setIsSurveyOpen(false)
  }

  useEffect(() => {
    Promise.all([fetchFreeBest(), fetchJobBest()])
  }, [fetchFreeBest, fetchJobBest])

  const currentList = selectedBoard === '자유게시판' ? freeBest : jobBest
  const isLoading = selectedBoard === '자유게시판' ? isFreeLoading : isJobLoading
  const error = selectedBoard === '자유게시판' ? freeError : jobError

  return (
    <>
      <SeoHelmet
        title='북잡 - 출판인을 위한 구인·구직 플랫폼'
        description='출판업계 채용/구직 정보와 자유게시판을 북잡에서 확인해보세요.'
        image='https://www.bookjob.co.kr/metatag.png'
        url='https://www.bookjob.co.kr'
      />

      <div className='flex flex-col items-center w-full'>
        <p className='sr-only'>
          북잡은 출판사 채용 공고, 프리랜서 편집자·디자이너 구직 정보 등 출판 업계를 위한 구인·구직
          플랫폼입니다. 출판인들을 위한 자유게시판도 함께 운영하고 있어요.
        </p>

        <a
          href={ROUTER_PATHS.INSTALL_METHOD}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full'
        >
          <Banner className='w-full h-full' />
        </a>

        <div className='w-full px-4 my-6 sm:px-10 sm:my-10'>
          <BoardButton
            onBoardSelect={handleBoardSelect}
            selectedBoard={selectedBoard}
            handleRefresh={handleRefresh}
          />
        </div>

        <div className='flex justify-center w-full px-4 sm:px-10'>
          {isLoading ? (
            <Spinner size={48} color='main-pink' />
          ) : error ? (
            <div className='flex flex-col text-center text-error-red'>
              {error}
              <button
                onClick={() => (selectedBoard === '자유게시판' ? fetchFreeBest() : fetchJobBest())}
                className='ml-2 text-blue-500'
              >
                재시도
              </button>
            </div>
          ) : (
            <BestList boardName={selectedBoard} bestList={currentList} />
          )}
        </div>
      </div>
      <SurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
        onDoNotShowToday={handleDoNotShowToday}
      />
    </>
  )
}

export default MainPage

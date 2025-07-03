import { useEffect, useState } from 'react'
import BestList from '../common/components/BestList'
import BoardButton from '../common/components/BoardButton'
import useBestStore from '../../../store/main/useBestStore'
import Spinner from '../../../components/web/Spinner'
import BannerExample from '../../../components/common/BannerExample'
import SeoHelmet from '../../../components/common/SeoHelmet'
import { CUSTOMER_INQUIRY } from '../../../utils/urls'
const MainPage = () => {
  const [selectedBoard, setSelectedBoard] = useState('자유게시판')
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
    Promise.all([fetchFreeBest(), fetchJobBest()])
  }, [fetchFreeBest, fetchJobBest])

  const currentList = selectedBoard === '자유게시판' ? freeBest : jobBest
  const isLoading = selectedBoard === '자유게시판' ? isFreeLoading : isJobLoading
  const error = selectedBoard === '자유게시판' ? freeError : jobError

  return (
    <div className='flex flex-col items-center w-full'>
      <SeoHelmet
        title='북잡 - 출판인을 위한 구인·구직 플랫폼'
        description='출판업계 채용/구직 정보와 자유게시판을 북잡에서 확인해보세요.'
        image='https://book-job.co.kr/metatag.png'
        url='https://book-job.co.kr'
      />

      <div className='w-full px-4 sm:px-10 mt-8'>
        <div className='max-w-3xl mx-auto text-left'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-4'>출판업계 구인구직 플랫폼, 북잡</h1>
          <p className='text-base sm:text-lg text-gray-700 leading-relaxed'>
            북잡은 출판사 채용 공고, 프리랜서 편집자·디자이너 구직 정보 등{' '}
            <strong>출판 업계</strong>를 위한
            <strong> 구인·구직 플랫폼</strong>입니다. 출판인들을 위한 자유게시판도 함께 운영하고
            있어요.
          </p>
        </div>
      </div>

      <a href={CUSTOMER_INQUIRY} target='_blank' rel='noopener noreferrer' className='w-full'>
        <BannerExample className='w-full h-full' />
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
          <div className='flex flex-col text-center text-red-500'>
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
  )
}

export default MainPage

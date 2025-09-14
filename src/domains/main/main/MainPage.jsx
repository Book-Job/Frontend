import { useEffect, useState } from 'react'
import BestList from '../common/components/BestList'
import BoardButton from '../common/components/BoardButton'
import useBestStore from '../../../store/main/useBestStore'
import Spinner from '../../../components/web/Spinner'
import Banner from '../../../components/common/Banner'
import SeoHelmet from '../../../components/common/SeoHelmet'
const MainPage = () => {
  const [selectedBoard, setSelectedBoard] = useState('구인구직')

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

  const currentList = selectedBoard === '자유게시판' ? freeBest : selectedBoard === '구인구직' ? jobBest : freeBest
  const isLoading = selectedBoard === '자유게시판' ? isFreeLoading : selectedBoard === '구인구직' ? isJobLoading : isFreeLoading
  const error = selectedBoard === '자유게시판' ? freeError : selectedBoard === '구인구직' ? jobError : freeError

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

        <Banner className='w-full h-full' />

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
    </>
  )
}

export default MainPage

import { useEffect, useState } from 'react'
import BestList from '../common/components/BestList'
import BoardButton from '../common/components/BoardButton'
import useBestStore from '../../../store/main/useBestStore'
import Spinner from '../../../components/web/Spinner'
import BannerExample from '../../../components/common/BannerExample'
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
      <BannerExample />
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

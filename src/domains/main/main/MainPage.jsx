import { useEffect, useState } from 'react'
import BestList from '../common/components/BestList'
import BoardButton from '../common/components/BoardButton'
import useBestStore from '../../../store/main/useBestStore'

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

  useEffect(() => {
    fetchFreeBest()
    fetchJobBest()
  }, [fetchFreeBest, fetchJobBest])

  const currentList = selectedBoard === '자유게시판' ? freeBest : jobBest
  const isLoading = selectedBoard === '자유게시판' ? isFreeLoading : isJobLoading
  const error = selectedBoard === '자유게시판' ? freeError : jobError

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='w-full mb-6 sm:mb-10'>
        <BoardButton onBoardSelect={handleBoardSelect} selectedBoard={selectedBoard} />
      </div>
      <div className='flex justify-center w-full'>
        {isLoading ? (
          <div className='text-center'>로딩 중...</div>
        ) : error ? (
          <div className='text-center text-red-500'>
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

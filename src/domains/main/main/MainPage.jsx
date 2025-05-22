import { useEffect, useState } from 'react'
import BestList from '../common/components/BestList'
import BoardButton from '../common/components/BoardButton'
import useBestStore from '../../../store/main/useBestStore'
import Spinner from '../../../components/web/Spinner'
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

  // 새로고침 버튼 핸들러
  const handleRefresh = () => {
    fetchFreeBest(true) // 강제 갱신
    fetchJobBest(true) // 강제 갱신
  }

  useEffect(() => {
    Promise.all([fetchFreeBest(), fetchJobBest()]) // 병렬 호출로 최적화
  }, [fetchFreeBest, fetchJobBest])

  const currentList = selectedBoard === '자유게시판' ? freeBest : jobBest
  const isLoading = selectedBoard === '자유게시판' ? isFreeLoading : isJobLoading
  // const isLoading = true
  const error = selectedBoard === '자유게시판' ? freeError : jobError

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='w-full mb-6 sm:mb-10'>
        <BoardButton
          onBoardSelect={handleBoardSelect}
          selectedBoard={selectedBoard}
          handleRefresh={handleRefresh}
        />
      </div>
      <div className='flex justify-center w-full'>
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

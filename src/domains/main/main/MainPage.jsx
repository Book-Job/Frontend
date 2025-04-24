import { useState } from 'react'
import BestList from '../common/components/BestList'
import BoardButton from '../common/components/BoardButton'

const MainPage = () => {
  const [selectedBoard, setSelectedBoard] = useState('자유게시판')
  const handleBoardSelect = (boardName) => {
    setSelectedBoard(boardName)
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='mb-10'>
        <BoardButton onBoardSelect={handleBoardSelect} selectedBoard={selectedBoard} />
      </div>
      <div>
        {selectedBoard === '자유게시판' && <BestList boardName='자유게시판' />}
        {selectedBoard === '구인구직' && <BestList boardName='구인구직' />}
      </div>
    </div>
  )
}

export default MainPage

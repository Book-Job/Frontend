import BestList from '../common/components/BestList'
import BoardButton from '../common/components/BoardButton'

const MainPage = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='mb-10'>
        <BoardButton />
      </div>
      <div className=''>
        <BestList />
      </div>
    </div>
  )
}

export default MainPage

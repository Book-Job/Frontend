import Header from '../../../components/web/Header'
import SearchBar from '../../../components/web/SearchBar'
import WorkBoard from '../../../components/web/WorkBoard'
import CountPost from './components/CountPost'
import JobDropDown from './components/JobDropDown'
import JobPostSortDropDown from './components/JobPostSortDropDown'

const JobMainPage = () => {
  return (
    <>
      <Header />
      <div className='w-full h-[314px] bg-light-gray'></div>
      <SearchBar className='mt-[45px] ml-[264px]' />
      <div className='flex items-center mt-[53px]'>
        <CountPost />
        <JobDropDown />
        <JobPostSortDropDown />
      </div>
      <div className='ml-[254px] flex gap-4'>
        <WorkBoard />
        <div className='mx-4'>
          <WorkBoard />
        </div>
        <WorkBoard />
      </div>
      <div className='ml-[254px] flex gap-4 mt-6'>
        <WorkBoard />
        <div className='mx-4'>
          <WorkBoard />
        </div>
        <WorkBoard />
      </div>
    </>
  )
}

export default JobMainPage

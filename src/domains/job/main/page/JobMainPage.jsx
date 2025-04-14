import SearchBar from '../../../../components/web/SearchBar'
import WorkBoard from '../../../../components/web/WorkBoard'
import MobileWorkBoard from '../../../../components/app/MobileWorkBoard'
import CountPost from '../components/CountPost'
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../components/JobPostSortDropDown'

const JobMainPage = () => {
  return (
    <>
      <div className='flex justify-center'>
        <SearchBar placeholder='검색어를 입력하세요' />
      </div>
      <div className='px-4 md:px-[100px] mt-2 lg:px-[250px]'>
        <div className='flex items-center justify-between'>
          <CountPost />
          <div className='flex items-end'>
            <JobDropDown />
            <JobPostSortDropDown className='text-xs sm:text-sm md:text-[15px] font-semibold' />
          </div>
        </div>

        <div className='flex gap-4 mt-4 mx-[27px]'>
          <WorkBoard className='hidden sm:block' />
          <MobileWorkBoard className='block sm:hidden' />
        </div>
      </div>
    </>
  )
}

export default JobMainPage

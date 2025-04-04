import BannerExample from '../../../components/common/BannerExample'
import SearchBar from '../../../components/web/SearchBar'
import JobPostSortDropDown from '../../job/main/components/JobPostSortDropDown'
import FreeBoard from '../../../components/web/FreeBoard'

const CommunityMainPage = () => {
  return (
    <>
      <BannerExample />
      <SearchBar className='mt-[45px] ml-[264px]' />
      <div className='mx-[250px] flex  flex-col'>
        <div className='flex justify-end mt-[20px]'>
          <JobPostSortDropDown />
        </div>
        <div className='mt-[15px]'>
          <FreeBoard
            title='내 꿈은 돈많은 백수'
            content='돈이 많으면 일을 그만둘 수 있지만.,, 돈이 없으면 슬철ㅇㅎㅇㄹㅇzzzzzzzzzㅎㅇ'
            name='난 은석'
            date='2020.12.12'
            comment1='123'
            view1='12'
            onNameClick={(name) => {
              console.log(`${name}의 게시글 보기`)
            }}
          />
        </div>
      </div>
    </>
  )
}
export default CommunityMainPage

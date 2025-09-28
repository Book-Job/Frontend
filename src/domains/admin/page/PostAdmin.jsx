import useIsMobile from '../../../hooks/header/useIsMobile'
import SideBarAdmin from '../common/components/SideBarAdmin'
import PostCategoryButton from '../../../components/common/admin/PostCategoryButton'
import DateFilterButtons from '../../../components/common/admin/DateFilterButtons'

const PostAdmin = () => {
  const isMobile = useIsMobile()
  const postcategories = ['전체 글', '구인 글', '구직 글', '자유글']
  const dateFilter = ['일간', '주간', '월간', '전체']

  return (
    <div>
      <div className='flex flex-row'>
        <div className='left-0 flex'>{isMobile ? null : <SideBarAdmin />}</div>
        <div className='flex items-start justify-between w-full p-4'>
          <span>
            <PostCategoryButton categories={postcategories} />
          </span>
          <span>
            <DateFilterButtons dateFilter={dateFilter} />
          </span>
        </div>
        <h1 className='bg-gray-300'>관리자 메인 페이지</h1>
      </div>
    </div>
  )
}

export default PostAdmin

import useIsMobile from '../../../hooks/header/useIsMobile'
import PageTitle from '../../Find/common/components/PageTitle'
import { useMemo, useState } from 'react'
import PostSortDropDown from '../../../components/common/PostSortDropDown'
import RecentList from './components/RecentList'

const MyRecentList = () => {
  const isMobile = useIsMobile()
  const [sort, setSort] = useState('latest')

  const sortedPosts = useMemo(() => {
    const recentList = JSON.parse(sessionStorage.getItem('RecentListSave')) || []
    return recentList.sort((a, b) => {
      return sort === 'latest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    })
  }, [sort])

  return (
    <div>
      <div className='sm:mt-10'>{isMobile ? null : <PageTitle title={'최근본 목록'} />}</div>
      {sortedPosts.length === 0 && (
        <div className='items-center text-center text-dark-gray'>최근 본 글이 없습니다.</div>
      )}
      {sortedPosts.length > 0 && (
        <>
          <div className='flex justify-end max-w-[932px] pr-4 mx-auto mb-2'>
            <PostSortDropDown onSortChange={setSort} />
          </div>
          <RecentList sortedPosts={sortedPosts} />
          <p className='my-10 text-center text-dark-gray'>최근본 목록은 최대 30개까지 입니다.</p>
        </>
      )}
    </div>
  )
}

export default MyRecentList

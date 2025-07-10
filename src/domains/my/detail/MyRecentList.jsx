import useIsMobile from '../../../hooks/header/useIsMobile'
import PageTitle from '../../Find/common/components/PageTitle'
import { useMemo, useState } from 'react'
import PostSortDropDown from '../../../components/common/PostSortDropDown'
import RecentList from './components/RecentList'

const MyRecentList = () => {
  const isMobile = useIsMobile()
  const [sort, setSort] = useState('latest')

  const sortedPosts = useMemo(() => {
    let recentList = []
    try {
      recentList = JSON.parse(sessionStorage.getItem('RecentListSave')) || []
    } catch (error) {
      console.warn('최근 본 목록 데이터를 불러오는데 실패했습니다:', error)
      sessionStorage.removeItem('RecentListSave')
    }
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
          <div className='flex justify-end mx-auto sm:mt-0 my-3 sm:max-w-[940px] max-w-xs'>
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

import MyPostHead from './components/MyPostHead'
import PostList from './components/PostList'
import useBoardStore from '../../../store/mypage/useBoardStore'

const MyPost = () => {
  const { choiceBoard } = useBoardStore()
  const jobData = [
    { id: 1, title: '아이돌나라 편집자 구해요', date: '2025.04.10', category: '구인' },
    { id: 2, title: '아이돌나라 편집자 구해요', date: '2025.04.03', category: '구직' },
  ]
  const freeData = [
    { id: 1, title: '아이돌나라 편집자 구해요', date: '2025.04.10', comment: 23, view: 342 },
    { id: 2, title: '아이돌나라 편집자 구해요', date: '2025.04.03', comment: 23, view: 342 },
  ]
  return (
    <div className='w-full'>
      <div className='sm:max-w-[940px] mx-auto'>
        <MyPostHead choiceBoard={choiceBoard} />
        {choiceBoard === 'job' ? <PostList mockData={jobData} /> : <PostList mockData={freeData} />}
      </div>
    </div>
  )
}

export default MyPost

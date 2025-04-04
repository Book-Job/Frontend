import { useEffect, useState } from 'react'
import { getAllPosts } from '../common/service/postService'
import BannerExample from '../../../components/common/BannerExample'
import SearchBar from '../../../components/web/SearchBar'
import JobPostSortDropDown from '../../job/main/components/JobPostSortDropDown'
import FreeBoard from '../../../components/web/FreeBoard'

const CommunityMainPage = () => {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const { boards } = await getAllPosts()
      console.log('응답:', boards)
      setPosts(boards || [])
    } catch (error) {
      console.error('게시글 불러오기 실패:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <BannerExample />
      <SearchBar className='mt-[45px] ml-[264px]' />
      <div className='mx-[250px] flex flex-col'>
        <div className='flex justify-end mt-[20px]'>
          <JobPostSortDropDown />
        </div>
        <div className='mt-[15px]'>
          {posts.map((post) => (
            <FreeBoard
              key={post.boardId}
              title={post.title}
              content={post.text}
              name={post.nickname}
              date={new Date(post.createdAt).toLocaleDateString()}
              comment1={post.commentCount}
              view1={post.viewCount}
              onNameClick={(name) => {
                console.log(`${name}의 게시글 보기`)
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default CommunityMainPage

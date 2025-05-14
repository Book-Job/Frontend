import { useState } from 'react'
import { getAllPosts } from './postService'

const useSearchPosts = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchTitle) => {
    if (!searchTitle) return

    setHasSearched(true)
    setSearchLoading(true)

    try {
      const res = await getAllPosts()
      console.log('받은 데이터:', res)

      if (Array.isArray(res.boards)) {
        const filteredResults = res.boards.filter(
          (post) => post.title.includes(searchTitle) || post.text.includes(searchTitle),
        )
        setSearchResults(filteredResults)
      } else {
        console.error('받은 데이터의 boards는 배열이 아닙니다:', res.boards)
        setSearchResults([])
      }
    } catch (err) {
      console.error('검색 실패:', err)
    } finally {
      setSearchLoading(false)
    }
  }

  return { searchResults, searchLoading, hasSearched, handleSearch }
}

export default useSearchPosts

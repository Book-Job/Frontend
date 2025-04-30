import { useState } from 'react'
import { searchPosts } from './postService'

const useSearchPosts = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchTitle) => {
    if (!searchTitle) return
    console.log('보내는 검색어:', searchTitle) // 추가
    setHasSearched(true)
    setSearchLoading(true)
    try {
      const res = await searchPosts({ title: searchTitle })
      console.log('받은 데이터', res)
      setSearchResults(res?.data?.boards || [])
    } catch (err) {
      console.error('검색 실패', err)
      console.error('에러 응답:', err?.response?.data) // 추가
    } finally {
      setSearchLoading(false)
    }
  }

  return { searchResults, searchLoading, hasSearched, handleSearch }
}

export default useSearchPosts

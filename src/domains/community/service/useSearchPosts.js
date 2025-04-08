import { useState } from 'react'
import { searchPosts } from './postService'

const useSearchPosts = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchTitle) => {
    if (!searchTitle) return
    setHasSearched(true)
    setSearchLoading(true)
    try {
      const res = await searchPosts({ title: searchTitle })
      setSearchResults(res?.data?.boards || [])
    } catch (err) {
      console.error('검색 실패', err)
    } finally {
      setSearchLoading(false)
    }
  }

  return { searchResults, searchLoading, hasSearched, handleSearch }
}

export default useSearchPosts

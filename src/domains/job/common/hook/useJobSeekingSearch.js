import { useState } from 'react'
import { getJobPosts } from '../../main/service/jobMainService'

const useJobSeekingSearch = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchKeyword) => {
    if (!searchKeyword) return

    setHasSearched(true)
    setSearchLoading(true)

    try {
      const res = await getJobPosts(null, 'LATEST', searchKeyword)
      if (Array.isArray(res.jobSeekings)) {
        setSearchResults(res.jobSeekings)
      } else {
        setSearchResults([])
      }
    } catch (err) {
      console.error('구직 검색 실패:', err)
      setSearchResults([])
    } finally {
      setSearchLoading(false)
    }
  }

  const reset = () => {
    setSearchResults([])
    setHasSearched(false)
  }

  return { searchResults, searchLoading, hasSearched, handleSearch, reset }
}

export default useJobSeekingSearch

import { useState } from 'react'
import { getAllRecruitmentPosts } from '../../main/service/jobMainService'

const useRecruitmentSearch = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchKeyword) => {
    if (!searchKeyword) return

    setHasSearched(true)
    setSearchLoading(true)

    try {
      const res = await getAllRecruitmentPosts(null, 'LATEST', searchKeyword)
      if (Array.isArray(res.jobPostings)) {
        setSearchResults(res.jobPostings)
      } else {
        setSearchResults([])
      }
    } catch (err) {
      console.error('구인 검색 실패:', err)
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

export default useRecruitmentSearch

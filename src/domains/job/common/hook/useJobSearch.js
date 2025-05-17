import { useState } from 'react'

const useJobSearch = (fetchJobs, resultKey) => {
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchKeyword) => {
    if (!searchKeyword) return

    setHasSearched(true)
    setSearchLoading(true)

    try {
      const res = await fetchJobs(null, 'LATEST', searchKeyword)
      if (Array.isArray(res[resultKey])) {
        setSearchResults(res[resultKey])
      } else {
        setSearchResults([])
      }
    } catch (err) {
      console.error('검색 실패:', err)
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

export default useJobSearch

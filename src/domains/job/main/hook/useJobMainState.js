import { useState, useCallback } from 'react'

export default function useJobMainState() {
  const [selectedTab, setSelectedTab] = useState('job list')
  const [order, setOrder] = useState('latest')
  const [keyword, setKeyword] = useState('')

  const handleTabChange = useCallback((tab) => {
    setSelectedTab(tab)
    setOrder('latest')
    setKeyword('')
  }, [])

  const handleOrderChange = useCallback((newOrder) => {
    setOrder(newOrder)
  }, [])

  const handleKeywordChange = useCallback((kw) => {
    setKeyword(kw)
  }, [])

  return {
    selectedTab,
    setSelectedTab: handleTabChange,
    order,
    setOrder: handleOrderChange,
    keyword,
    setKeyword: handleKeywordChange,
  }
}

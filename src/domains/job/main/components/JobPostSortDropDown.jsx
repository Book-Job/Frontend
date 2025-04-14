import { useState } from 'react'
import SortDropdown from '../../../../components/common/SortDropdown'

const JobPostSortDropDown = ({ className = '' }) => {
  const [selectedSort, setSelectedSort] = useState('latest')

  const handleSortChange = (value) => {
    setSelectedSort(value)
  }

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된 순' },
  ]

  return (
    <SortDropdown
      className={`cursor-pointer ${className}`}
      options={sortOptions}
      selected={selectedSort}
      onChange={handleSortChange}
    />
  )
}

export default JobPostSortDropDown

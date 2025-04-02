import { useState } from 'react'
import SortDropdown from '../../../../components/common/SortDropdown'
const JobPostSortDropDown = () => {
  const [selectedSort, setSelectedSort] = useState('latest')

  const handleSortChange = (value) => {
    setSelectedSort(value)
  }

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
  ]

  return (
    <SortDropdown
      className='cursor-pointer'
      options={sortOptions}
      selected={selectedSort}
      onChange={handleSortChange}
    />
  )
}

export default JobPostSortDropDown

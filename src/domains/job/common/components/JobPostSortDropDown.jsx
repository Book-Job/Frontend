import { useEffect, useState } from 'react'
import SortDropdown from '../../../../components/common/SortDropdown'

const JobPostSortDropDown = ({ className = '', onSortChange, options, value }) => {
  const [selectedSort, setSelectedSort] = useState(value || 'latest')

  useEffect(() => {
    setSelectedSort(value)
  }, [value])

  const handleSortChange = (newValue) => {
    console.log('JobPostSortDropDown 선택됨:', newValue)
    setSelectedSort(newValue)
    onSortChange?.(newValue)
  }

  return (
    <SortDropdown
      className={`cursor-pointer ${className}`}
      options={options}
      selected={selectedSort}
      onChange={handleSortChange}
    />
  )
}

export default JobPostSortDropDown

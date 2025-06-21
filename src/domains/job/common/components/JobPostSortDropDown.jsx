import { useEffect, useState } from 'react'
import SortDropdown from '../../../../components/common/SortDropdown'

const JobPostSortDropDown = ({ className = '', onSortChange, options, value }) => {
  const [selectedSort, setSelectedSort] = useState(value || 'latest')

  useEffect(() => {
    setSelectedSort(value)
  }, [value])

  const handleSortChange = (newValue) => {
    setSelectedSort(newValue)
    onSortChange?.(newValue)
  }

  return (
    <SortDropdown
      className={`sort-dropdown cursor-pointer ${className}`}
      options={options}
      selected={selectedSort}
      onChange={handleSortChange}
    />
  )
}

export default JobPostSortDropDown

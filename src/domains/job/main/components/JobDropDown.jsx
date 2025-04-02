import { useState } from 'react'

const JobDropDown = () => {
  const [selectedJobTabs, setSelectedJobTabs] = useState('job list')

  const handleJobTabChange = (event) => {
    setSelectedJobTabs(event.target.value)
  }

  return (
    <div className='p-4'>
      <select
        onChange={handleJobTabChange}
        value={selectedJobTabs}
        className='cursor-pointer outline-none'
      >
        <option value='job list'>구인</option>
        <option value='job search'>구직</option>
      </select>
    </div>
  )
}

export default JobDropDown

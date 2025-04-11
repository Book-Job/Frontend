import { useState } from 'react'

const JobDropDown = () => {
  const [selectedJobTabs, setSelectedJobTabs] = useState('job list')

  const handleToggle = (tab) => {
    setSelectedJobTabs(tab)
  }

  return (
    <div>
      <button
        onClick={() => handleToggle('job list')}
        className={`px-4 py-2 rounded-full border transition duration-200 ${
          selectedJobTabs === 'job list'
            ? 'bg-main-pink text-white'
            : 'bg-white text-black border-gray-300'
        }`}
      >
        구인
      </button>
      <button
        onClick={() => handleToggle('job search')}
        className={`px-4 py-2 rounded-full border transition duration-200 ${
          selectedJobTabs === 'job search'
            ? 'bg-main-pink text-white'
            : 'bg-white text-black border-gray-300'
        }`}
      >
        구직
      </button>
    </div>
  )
}

export default JobDropDown

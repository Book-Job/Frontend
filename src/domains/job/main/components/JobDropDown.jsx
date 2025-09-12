const JobDropDown = ({ selectedJobTabs, handleTabChange }) => {
  const tabs = [
    { value: 'job list', label: '구인' },
    { value: 'job search', label: '구직' },
  ]

  return (
    <div className='flex mr-2 gap-x-3'>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={`
            text-[15px] px-4 py-2 rounded-lg border transition-all duration-200
            ${
              selectedJobTabs === tab.value
                ? 'bg-main-pink text-white font-semibold border-main-pink shadow-md'
                : 'bg-white text-dark-gray font-medium border-gray-300 hover:bg-gray-100'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default JobDropDown

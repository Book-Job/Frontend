const JobDropDown = ({ selectedJobTabs, handleTabChange }) => {
  const tabs = [
    { value: 'job list', label: '구인' },
    { value: 'job search', label: '구직' },
  ]

  return (
    <div className='inline-flex items-center bg-gray-100 rounded-xl p-1 mr-4'>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={`
            relative px-5 py-2 text-sm rounded-lg transition-all
            ${
              selectedJobTabs === tab.value
                ? 'bg-white text-main-pink shadow-sm font-bold'
                : 'text-gray-600 hover:text-dark-gray font-medium '
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

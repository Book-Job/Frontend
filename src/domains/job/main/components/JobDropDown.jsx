const JobDropDown = ({ selectedJobTabs, handleTabChange }) => {
  const tabs = [
    { value: 'job list', label: '구인' },
    { value: 'job search', label: '구직' },
  ]

  return (
    <div className='flex mt-3 mr-2 gap-x-3'>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={`text-[15px] transition-all duration-200 
          ${selectedJobTabs === tab.value ? 'text-main-pink font-semibold' : 'text-gray-600 font-medium'} bg-white`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default JobDropDown

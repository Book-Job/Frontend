const DateFilterButtons = ({ dateFilter }) => {
  return (
    <div>
      {dateFilter.map((dateFilter) => (
        <button
          key={dateFilter}
          className='px-4 text-xl border hover:text-white hover:bg-main-pink hover:border-main-pink'
        >
          {dateFilter}
        </button>
      ))}
    </div>
  )
}

export default DateFilterButtons

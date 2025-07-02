const FindLink = ({ title, onClick, linkName }) => {
  return (
    <div className='flex justify-end text-base mt-7'>
      {title}
      <button className='ml-5 text-base font-bold text-main-pink' onClick={onClick}>
        {linkName}
      </button>
    </div>
  )
}

export default FindLink

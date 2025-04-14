const FindLink = ({ title, onClick, linkName }) => {
  return (
    <div className='flex justify-end text-lg mt-7'>
      {title}
      <button className='ml-5 text-lg font-bold text-main-pink' onClick={onClick}>
        {linkName}
      </button>
    </div>
  )
}

export default FindLink

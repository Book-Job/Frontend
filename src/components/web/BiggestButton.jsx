const BiggestButton = ({ label }) => {
  return (
    <button className='w-[575px] h-[58px] bg-[#D9D9D9] rounded-[5px] cursor-pointer'>
      <span className='font-bold text-[20px] text-white'>{label}</span>
    </button>
  )
}

export default BiggestButton

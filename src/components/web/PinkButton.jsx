const PinkButton = ({ label }) => {
  return (
    <button className='w-[226px] h-[58px] bg-[#E36397] rounded-[5px] cursor-pointer'>
      <span className='font-bold text-[20px] text-white'>{label}</span>
    </button>
  )
}

export default PinkButton

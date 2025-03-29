const BigButton = ({ label, bgColor = '#E36397' }) => {
  return (
    <button className='w-[332px] h-[58px] rounded-[5px]' style={{ backgroundColor: bgColor }}>
      <span className='font-bold text-[20px] text-white'>{label}</span>
    </button>
  )
}

export default BigButton

import PropTypes from 'prop-types'

const LabelWithInput = ({ label, placeholder }) => {
  return (
    <div className='flex flex-col items-start justify-center ml-[16px]'>
      <span className='mb-[27px] text-[24px] font-bold'>{label}</span>
      <input
        type='text'
        placeholder={placeholder}
        className='w-[580px] h-[58px] border border-gray-8e8e8e rounded px-4 text-[18px] text-black placeholder:text-gray-8e8e8e'
      />
    </div>
  )
}

LabelWithInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default LabelWithInput

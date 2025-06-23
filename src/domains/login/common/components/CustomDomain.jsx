import PropTypes from 'prop-types'
const CustomDomain = ({ customDomain, setCustomDomain, disabled }) => {
  return (
    <div className='flex items-end'>
      <input
        type='text'
        placeholder='직접 입력'
        value={customDomain}
        onChange={(e) => setCustomDomain(e.target.value)}
        className='border border-dark-gray rounded px-4 text-center sm:text-base text-sm text-black placeholder:text-dark-gray h-[58px] focus:border-main-pink focus:outline-none w-full'
        disabled={disabled}
      />
    </div>
  )
}
CustomDomain.propTypes = {
  customDomain: PropTypes.string.isRequired,
  setCustomDomain: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}
export default CustomDomain

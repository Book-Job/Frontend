const DomainSelector = ({
  domain,
  customDomain,
  isCustom,
  setDomain,
  setCustomDomain,
  setIsCustom,
}) => {
  const domainOptions = [
    'naver.com',
    'gmail.com',
    'daum.net',
    'nate.com',
    'hanmail.net',
    'hotmail.com',
    'yahoo.co.kr',
    'empal.com',
    'korea.com',
    'hanmir.com',
    'dreamwiz.com',
    'orgio.net',
    'chol.com',
    'hitel.net',
    'custom',
  ]

  return (
    <div className='flex items-end '>
      {isCustom ? (
        <input
          type='text'
          placeholder='직접 입력'
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
          className='border border-dark-gray rounded px-4 text-[18px] text-black placeholder:text-dark-gray h-[58px] focus:border-main-pink focus:outline-none w-32 sm:w-40'
        />
      ) : (
        <select
          value={domain}
          onChange={(e) => {
            if (e.target.value === 'custom') {
              setIsCustom(true)
              setDomain('')
            } else {
              setIsCustom(false)
              setDomain(e.target.value)
              setCustomDomain('')
            }
          }}
          className='border border-dark-gray rounded px-4 text-[16px] text-black placeholder:text-dark-gray h-[58px] focus:border-main-pink focus:outline-none w-32 sm:w-40'
        >
          {domainOptions.map((option) => (
            <option key={option} value={option}>
              {option === 'custom' ? '직접 입력' : option}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

// DomainSelector.propTypes = {
//   domain: PropTypes.string.isRequired,
//   customDomain: PropTypes.string.isRequired,
//   isCustom: PropTypes.bool.isRequired,
//   setDomain: PropTypes.func.isRequired,
//   setCustomDomain: PropTypes.func.isRequired,
//   setIsCustom: PropTypes.func.isRequired,
// }

export default DomainSelector

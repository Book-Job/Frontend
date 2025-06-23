const DomainSelector = ({ domain, isCustom, setDomain, setIsCustom, setCustomDomain }) => {
  const domainOptions = [
    'custom',
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
  ]

  return (
    <div className='flex items-end'>
      <select
        value={isCustom ? 'custom' : domain}
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
        className='border border-dark-gray rounded px-4 sm:text-base text-sm text-black placeholder:text-dark-gray h-[58px] focus:border-main-pink focus:outline-none w-full'
      >
        {domainOptions.map((option) => (
          <option key={option} value={option}>
            {option === 'custom' ? '직접 입력' : option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DomainSelector

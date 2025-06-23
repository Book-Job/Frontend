const CustomDomain = ({ customDomain, setCustomDomain,disabled }) => {
  return (
    <div className='flex items-end'>
      <input
        type='text'
        placeholder='직접 입력'
        value={customDomain}
        onChange={(e) => setCustomDomain(e.target.value)}
        className='border border-dark-gray rounded px-4 sm:text-base text-sm text-black placeholder:text-dark-gray h-[58px] focus:border-main-pink focus:outline-none w-full'
        disabled={disabled}
      />
    </div>
  )
}

export default CustomDomain

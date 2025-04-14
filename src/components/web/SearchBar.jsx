import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import search from '../../assets/icons/common/common_search.svg'
import useDebounce from '../../hooks/search/useDebounce'

const SearchBar = ({ onSearch, placeholder }) => {
  const [input, setInput] = useState('')
  const debouncedValue = useDebounce(input, 500)

  useEffect(() => {
    if (debouncedValue.trim() !== '') {
      onSearch(debouncedValue)
    }
  }, [debouncedValue])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(input)
    }
  }

  return (
    <div
      className={`flex items-center border border-dark-gray bg-[#F6F6F6]
    w-[336px] h-[40px] sm:w-[700px] sm:h-[60px] md:w-[800px] lg:w-[912px] 
    rounded-[30px]`}
    >
      <img
        src={search}
        alt='search'
        className='ml-4 w-[24px] h-[24px] md:ml-[30px] md:w-[31px] md:h-[31px]'
      />
      <input
        type='text'
        className='w-full outline-none text-base md:text-[20px] p-2 ml-2 md:ml-4 bg-transparent'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default SearchBar

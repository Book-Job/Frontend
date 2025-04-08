import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import search from '../../assets/icons/common/common_search.svg'
import useDebounce from '../../hooks/search/useDebounce'

const SearchBar = ({ onSearch, placeholder, className }) => {
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
      className={`flex items-center border border-dark-gray bg-[#F6F6F6] w-[912px] h-[60px] rounded-[30px] ${className}`}
    >
      <img src={search} alt='search' className='ml-[30px] w-[31px] h-[31px]' />
      <input
        type='text'
        className='w-full outline-none text-[20px] p-2 ml-4 bg-transparent'
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

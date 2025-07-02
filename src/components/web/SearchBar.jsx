import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import searchIcon from '../../assets/icons/common/common_search.svg'
import cancelIcon from '../../assets/icons/common/common_search_cancel_button.svg'
import useDebounce from '../../hooks/search/useDebounce'

const SearchBar = ({ onSearch, placeholder, className }) => {
  const [input, setInput] = useState('')
  const debouncedValue = useDebounce(input, 500)

  useEffect(() => {
    onSearch(debouncedValue.trim())
  }, [debouncedValue])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(input)
    }
  }

  const handleClear = () => {
    setInput('')
    onSearch('')
  }

  return (
    <form
      role='search'
      className={`flex items-center border border-light-gray bg-lightBlueGray w-full
    h-[40px] sm:h-[56px] rounded-md mt-4 max-w-xs sm:max-w-[940px]
    shadow-sm hover:shadow-md transition-shadow duration-200 px-2 ${className ?? ''}`}
      onSubmit={(e) => {
        e.preventDefault()
        handleKeyDown({ key: 'Enter' })
      }}
    >
      <label htmlFor='search-input' className='sr-only'>
        검색
      </label>

      <input
        id='search-input'
        type='text'
        className='flex-1 p-2 text-base bg-transparent outline-none md:text-lg placeholder-dark-gray'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />

      <button
        type='button'
        onClick={input ? handleClear : () => onSearch(input)}
        className='mx-2 focus:outline-none'
      >
        <img
          src={input ? cancelIcon : searchIcon}
          alt={input ? '검색어 지우기' : '검색'}
          className='w-5 h-5'
        />
      </button>
    </form>
  )
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default SearchBar

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import searchIcon from '../../assets/icons/common/common_search.svg'
import cancelIcon from '../../assets/icons/common/common_search_cancel_button.svg'
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

  const handleClear = () => {
    setInput('')
  }

  return (
    <form
      role='search'
      className='flex items-center border border-light-gray bg-lightBlueGray
        w-full max-w-[90%] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[912px]
        h-[40px] sm:h-[60px] rounded-md mt-4
        shadow-sm hover:shadow-md transition-shadow duration-200 px-4'
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
        className='flex-1 outline-none text-base md:text-lg p-2 bg-transparent placeholder-dark-gray'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />

      <button
        type='button'
        onClick={input ? handleClear : () => onSearch(input)}
        className='ml-2 focus:outline-none'
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

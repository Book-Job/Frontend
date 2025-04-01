import PropTypes from 'prop-types'
import search from '../../assets/icons/common/common_search.svg'

const SearchBar = ({ value, onChange, placeholder }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(value);  // 엔터 키를 눌렀을 때, 검색어를 전달
    }
  }
  return (
    <div className='flex items-center border border-[#8E8E8E] bg-[#F6F6F6] w-[912px] h-[60px] rounded-[30px]'>
      <img src={search} alt='search' className='ml-[30px] w-[31px] h-[31px]' />
      <input
        type='text'
        className='w-full outline-none text-[20px] p-2 ml-4 bg-transparent'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}  // 엔터키 이벤트 핸들러 추가
      />
    </div>
  )
}
SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,  // onSearch 함수 prop 추가
}
export default SearchBar

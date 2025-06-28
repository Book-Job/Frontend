import PropTypes from 'prop-types'

const BoardCategory = ({ label = '기타' }) => {
  const boardLabel = {
    자유게시판: 'bg-[#ECFDF5] text-[#1B7500] w-[81px]',
    구인: 'bg-[#EBF7FF] text-[#2563EB] w-[60px]',
    구직: 'bg-[#FFEFEB] text-[#DC2626] w-[60px]',
    기타: 'bg-[#cecece] text-[#2e2e2e] w-[60px]',
  }
  return (
    <button className={`h-[24px] text-[14px] font-semibold rounded-md ${boardLabel[label]}`}>
      {label}
    </button>
  )
}

BoardCategory.propTypes = {
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  labelColor: PropTypes.string,
  width: PropTypes.string,
}

export default BoardCategory

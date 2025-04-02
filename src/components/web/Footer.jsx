import PropTypes from 'prop-types'

const Footer = ({ email,onClick }) => {
  return (
    <div className='flex w-full h-[157px] bg-[#FDF8FA] justify-center gap-24 items-center px-10'>
      <div className='text-[50px] font-bold text-[#E36397]'>bookjob</div>
      <div className='flex text-[16px] flex-row gap-10 text-[#8E8E8E]'>
        <div className=''>팀장 | 이신지</div>
        <div className=''>팀원 | 김영철, 이은석, 송수빈</div>
        <div className='' onClick={onClick}>이메일 | {email}</div>
      </div>
    </div>
  )
}
Footer.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Footer

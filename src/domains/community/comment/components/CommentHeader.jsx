import foldComment from '../../../../assets/icons/common/common_outspread.svg'

const CommentHeader = () => {
  return (
    <div className='flex'>
      <span>4개의 댓글</span>
      <span>본문보기 | </span>
      <span>댓글 닫기</span>
      <img src={foldComment} alt='댓글 접기' />
    </div>
  )
}
export default CommentHeader

import spreadComment from '../../../../assets/icons/common/common_outspread.svg'
import foldComment from '../../../../assets/icons/common/common_fold_arrow.svg'
import pencil from '../../../../assets/icons/common/common_pencil.svg'

const CommentHeader = ({ commentCount, isOpen, toggleOpen }) => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        <span className='text-main-pink'>{commentCount}개의 댓글</span>
        <img src={pencil} alt='연필 아이콘' className='w-4 ml-2' />
      </div>
      <div className='flex items-center text-[14px] cursor-pointer' onClick={toggleOpen}>
        <span className='mr-3'>본문보기</span>
        <span> | </span>
        <span className='mx-2'>{isOpen ? '댓글 닫기' : '댓글 열기'}</span>
        <img
          src={isOpen ? foldComment : spreadComment}
          alt='댓글 토글 아이콘'
          className='w-3 ml-1'
        />
      </div>
    </div>
  )
}

export default CommentHeader

import spreadComment from '../../../../assets/icons/common/common_outspread.svg'
import foldComment from '../../../../assets/icons/common/common_fold_arrow.svg'
import pencil from '../../../../assets/icons/common/common_pencil.svg'

const CommentHeader = ({ commentCount, isOpen, toggleOpen }) => {
  return (
    <header className='flex justify-between'>
      <section className='flex items-center' aria-label='댓글 수'>
        <strong className='text-main-pink'>{commentCount}개의 댓글</strong>
        <img src={pencil} alt='연필 아이콘' className='w-4 ml-2' />
      </section>
      <nav
        className='flex items-center text-[14px] cursor-pointer'
        aria-label='댓글 토글'
        onClick={toggleOpen}
      >
        <button
          type='button'
          className='flex items-center mx-2'
          aria-expanded={isOpen}
          aria-controls='comment-list'
        >
          <span>{isOpen ? '댓글 닫기' : '댓글 열기'}</span>
          <img
            src={isOpen ? foldComment : spreadComment}
            alt='댓글 토글 아이콘'
            className='w-3 h-3 ml-1'
          />
        </button>
      </nav>
    </header>
  )
}

export default CommentHeader

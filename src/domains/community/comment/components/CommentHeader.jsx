import spreadComment from '../../../../assets/icons/common/common_outspread.svg'
import foldComment from '../../../../assets/icons/common/common_fold_arrow.svg'
import pencil from '../../../../assets/icons/common/common_pencil.svg'

const CommentHeader = ({ commentCount, isOpen, toggleOpen }) => {
  return (
    <header className='flex justify-between'>
      <section aria-labelledby='comment-count-title' className='flex items-center'>
        <h2 id='comment-count-title' className='text-main-pink font-bold text-base'>
          {commentCount}개의 댓글
        </h2>
        <img src={pencil} alt='댓글 작성 아이콘' className='w-4 ml-2' />
      </section>

      <div className='flex items-center text-[14px]'>
        <button
          type='button'
          onClick={toggleOpen}
          className='flex items-center mx-2'
          aria-expanded={isOpen}
          aria-controls='comment-list'
        >
          <span>{isOpen ? '댓글 닫기' : '댓글 열기'}</span>
          <img
            src={isOpen ? foldComment : spreadComment}
            alt={isOpen ? '댓글 닫기 아이콘' : '댓글 열기 아이콘'}
            className='w-3 ml-1 h-3'
          />
        </button>
      </div>
    </header>
  )
}

export default CommentHeader

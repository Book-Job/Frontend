import foldComment from '../../../../assets/icons/common/common_outspread.svg'
import pencil from '../../../../assets/icons/common/common_pencil.svg'

const CommentHeader = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        <span className='text-main-pink'>4개의 댓글</span>
        <img src={pencil} alt='연필 아이콘' className='w-4 ml-2' />
      </div>
      <div className='flex items-center text-[14px]'>
        <span className='mr-3'>본문보기</span>
        <span> | </span>
        <span className='mx-2'>댓글 닫기</span>
        <img src={foldComment} alt='댓글 접기' className='w-3 ml-1' />
      </div>
    </div>
  )
}

export default CommentHeader

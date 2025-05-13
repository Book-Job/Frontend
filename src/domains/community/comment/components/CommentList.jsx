const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className='text-gray-500 mt-4'>작성된 댓글이 없습니다.</p>
  }

  return (
    <div className='w-full mt-4 border border-dark-gray rounded-md overflow-hidden'>
      {comments.map((comment, index) => (
        <div key={comment.commentId}>
          <div className='px-4 py-3'>
            <div className='flex justify-between items-center mb-1'>
              <span className='font-semibold text-gray-800'>{comment.nickname}</span>
            </div>
            <p className='text-gray-700 whitespace-pre-wrap flex justify-between items-center mt-2'>
              {comment.text}
            </p>
          </div>
          <span className='text-[13px] text-dark-gray flex justify-between items-center mb-1 ml-4'>
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
          {index !== comments.length - 1 && <hr className='border-t border-light-gray mx-4' />}
        </div>
      ))}
    </div>
  )
}

export default CommentList

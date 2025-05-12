const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p>작성된 댓글이 없습니다.</p>
  }
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.commentId}>
          <div>{comment.nickname}</div>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  )
}

export default CommentList

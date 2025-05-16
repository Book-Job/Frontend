import commentImg from '../../../../assets/icons/common/comment.svg'
import { useState } from 'react'
import useBoardStore from '../../../../store/mypage/useBoardStore'
import BoardCategory from '../../../../components/web/BoardCategory'
import PropTypes from 'prop-types'

const PostList = ({ boardData }) => {
  const [checkedItems, setCheckedItems] = useState([])
  const { choiceBoard } = useBoardStore()

  const toggleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const isAllChecked = boardData && boardData.length > 0 && boardData.length === checkedItems.length

  const toggleAll = () => {
    setCheckedItems(isAllChecked ? [] : boardData.map((item) => item.boardId || item.recruitmentId))
  }

  const deleteItem = (id, title) => {
    alert(`제목: ${title} 삭제 (ID: ${id})`)
  }
  return (
    <div>
      <div className='sm:text-[30px] font-bold flex justify-start mb-[20px] mt-[40px] text-[20px]'>
        {choiceBoard === 'job' ? '구인 | 구직' : '자유게시판'}
      </div>
      <div className='flex flex-row justify-between my-3'>
        <div className='flex gap-3'>
          <input type='checkbox' checked={isAllChecked} onChange={toggleAll} />
          전체 선택
        </div>
        <div className='flex gap-2'>
          <button className='text-dark-gray'>선택삭제</button>
          <div className='text-dark-gray'>|</div>
          <button className='text-main-pink'>글 작성</button>
        </div>
      </div>
      <div className='border border-b-black'></div>
      <table className='w-full text-sm'>
        <thead className='border-b'>
          <tr className='h-12'>
            <th>
              <input type='checkbox' checked={isAllChecked} onChange={toggleAll} />
            </th>
            <th>No</th>
            <th>제목</th>
            <th>
              날짜 <span className='text-[10px]'>▲</span>
            </th>
            {Array.isArray(boardData) &&
              boardData.some((item) => item.recruitmentCategory !== undefined) && <th>카테고리</th>}
            {Array.isArray(boardData) &&
              boardData.some((item) => item.commentCount !== undefined) && <th>댓글</th>}
            {Array.isArray(boardData) && boardData.some((item) => item.viewCount !== undefined) && (
              <th>조회수</th>
            )}
            {/* {boardData.some((item) => item.recruitmentCategory !== undefined) && <th>카테고리</th>}
            {boardData.some((item) => item.commentCount !== undefined) && <th>댓글</th>}
            {boardData.some((item) => item.viewCount !== undefined) && <th>조회수</th>} */}
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((item, index) => (
            <tr key={item.boardId || item.recruitmentId} className='h-12 border-b'>
              <td>
                <input
                  type='checkbox'
                  checked={checkedItems.includes(item.boardId || item.recruitmentId)}
                  onChange={() => toggleCheck(item.boardId || item.recruitmentId)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.createdAt.split('T')[0]}</td>
              {item.recruitmentCategory !== undefined &&
                (item.recruitmentCategory === '구인' ? (
                  <td>
                    <BoardCategory
                      label={'구인'}
                      bgColor={'#EBF7FF'}
                      labelColor={'#2563EB'}
                      width={'60px'}
                    />
                  </td>
                ) : (
                  <td>
                    <BoardCategory
                      label={'구직'}
                      bgColor={'#FFEFEB'}
                      labelColor={'#DC2626'}
                      width={'60px'}
                    />
                  </td>
                ))}
              {item.commentCount !== undefined && (
                <td>
                  <div className='flex items-center justify-center h-4 gap-1 sm:gap-2'>
                    <img src={commentImg} alt='commentImg' className='h-3 sm:h-4' />
                    {item.commentCount}
                  </div>
                </td>
              )}
              {item.viewCount !== undefined && <td>{item.viewCount}</td>}
              <td>
                <button
                  onClick={() => deleteItem(item.boardId || item.recruitmentId, item.title)}
                  className='text-light-gray hover:text-main-pink'
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
PostList.propTypes = {
  boardData: PropTypes.arrayOf(
    PropTypes.shape({
      boardId: PropTypes.number,
      recruitmentId: PropTypes.number,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      recruitmentCategory: PropTypes.string,
      commentCount: PropTypes.number,
      viewCount: PropTypes.number,
    }),
  ).isRequired,
}
export default PostList

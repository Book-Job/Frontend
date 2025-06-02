import commentImg from '../../../../assets/icons/common/comment.svg'
import { useState } from 'react'
import useBoardStore from '../../../../store/mypage/useBoardStore'
import BoardCategory from '../../../../components/web/BoardCategory'
import PropTypes from 'prop-types'
import { deleteMyFreeBoardData, deleteMyJobBoardData } from '../../services/useMyBoardServices'
import useMyBoardStore from '../../../../store/mypage/useMyBoardStore'
import ToastService from '../../../../utils/toastService'

const PostList = () => {
  const [checkedItems, setCheckedItems] = useState([])
  const { freeBoard, jobBoard, fetchFreeBoard, fetchJobBoard } = useMyBoardStore()
  const { choiceBoard } = useBoardStore()
  const boardData = choiceBoard === '구인구직' ? jobBoard : freeBoard

  const toggleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const isAllChecked = boardData && boardData.length > 0 && boardData.length === checkedItems.length
  const toggleAll = () => {
    setCheckedItems(isAllChecked ? [] : boardData.map((item) => item.boardId || item.recruitmentId))
  }

  const deleteItems = async (items, isJobBoard) => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      ToastService.error('로그인이 필요합니다.')
      return
    }
    try {
      let response
      if (isJobBoard) {
        const deleteRequest = items.map((item) => ({
          recruitmentId: item.id,
          recruitmentCategory: item.recruitmentCategory || 'JOB_POSTING',
        }))
        response = await deleteMyJobBoardData(token, deleteRequest)
      } else {
        response = await deleteMyFreeBoardData(token, items)
      }
      if (response && response.message === 'success') {
        setCheckedItems([])
        await (isJobBoard ? fetchJobBoard(token, true) : fetchFreeBoard(token, true))
      } else {
        ToastService.info('삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error(`${isJobBoard ? '구인구직' : '자유게시판'} 삭제 오류:`, error)
      ToastService.error('삭제 중 오류가 발생했습니다.')
    } finally {
      useMyBoardStore.setState({ [isJobBoard ? 'isJobLoading' : 'isFreeLoading']: false })
    }
  }
  const handleDeleteItem = (id, title, recruitmentCategory) => {
    if (
      window.confirm(
        `제목: ${title} (${choiceBoard === '구인구직' ? '구인구직' : '자유게시판'}) 삭제하시겠습니까?`,
      )
    ) {
      const items = choiceBoard === '구인구직' ? [{ id, recruitmentCategory }] : [id]
      deleteItems(items, choiceBoard === '구인구직')
    }
  }

  const handleDeleteSelected = () => {
    if (checkedItems.length === 0) {
      ToastService.info('삭제할 항목을 선택하세요.')
      return
    }
    if (window.confirm(`${checkedItems.length}개의 항목을 삭제하시겠습니까?`)) {
      const items =
        choiceBoard === '구인구직'
          ? boardData
              .filter((item) => checkedItems.includes(item.recruitmentId))
              .map((item) => ({
                id: item.recruitmentId,
                recruitmentCategory: item.recruitmentCategory,
              }))
          : checkedItems
      deleteItems(items, choiceBoard === '구인구직')
    }
  }

  return (
    <div>
      <div className='sm:text-[30px] font-bold flex justify-start mb-[20px] mt-[40px] text-[20px]'>
        {choiceBoard === '구인구직' ? '구인 | 구직' : '자유게시판'}
      </div>
      <div className='flex flex-row justify-between my-3'>
        <div className='flex gap-3'>
          <input type='checkbox' checked={isAllChecked} onChange={toggleAll} />
          전체 선택
        </div>
        <div className='flex gap-2'>
          <button onClick={handleDeleteSelected} className='text-dark-gray'>
            선택삭제
          </button>
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
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(boardData) &&
            boardData.map((item, index) => (
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
                  (item.recruitmentCategory === 'JOB_POSTING' ? (
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
                    onClick={() =>
                      handleDeleteItem(
                        item.boardId || item.recruitmentId,
                        item.title,
                        item.recruitmentCategory,
                      )
                    }
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

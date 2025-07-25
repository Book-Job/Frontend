import commentImg from '../../../../assets/icons/common/comment.svg'
import { useMemo, useState } from 'react'
import useBoardStore from '../../../../store/mypage/useBoardStore'
import BoardCategory from '../../../../components/web/BoardCategory'
import PropTypes from 'prop-types'
import { deleteMyFreeBoardData, deleteMyJobBoardData } from '../../services/useMyBoardServices'
import useMyBoardStore from '../../../../store/mypage/useMyBoardStore'
import ToastService from '../../../../services/toast/ToastService'
import useWriteModalStore from '../../../../store/modal/useWriteModalStore'
import { useQueryClient } from '@tanstack/react-query'
import PostSortDropDown from '../../../../components/common/PostSortDropDown'
import { useNavigate } from 'react-router-dom'

const PostList = ({ boardData }) => {
  const [checkedItems, setCheckedItems] = useState([])
  const { choiceBoard } = useBoardStore()
  const { resetBoard } = useMyBoardStore()
  const { setShowModal } = useWriteModalStore()
  const queryClient = useQueryClient()
  const [sort, setSort] = useState('latest')
  const navigate = useNavigate()

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
    try {
      let response
      if (isJobBoard) {
        const deleteRequest = items.map((item) => ({
          recruitmentId: item.id,
          recruitmentCategory: item.recruitmentCategory || 'JOB_POSTING',
        }))
        response = await deleteMyJobBoardData(deleteRequest)
        ToastService.success('성공적으로 삭제되었습니다.')
      } else {
        response = await deleteMyFreeBoardData(items)
        ToastService.success('성공적으로 삭제되었습니다.')
      }
      if (response && response.message === 'success') {
        setCheckedItems([])
        resetBoard(isJobBoard ? 'job' : 'free')
        queryClient.invalidateQueries(['myPosts', choiceBoard])
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

  const sortedBoardData = useMemo(() => {
    return [...boardData].sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return sort === 'latest' ? dateB - dateA : dateA - dateB
    })
  }, [boardData, sort])

  const handleSortToggle = () => {
    setSort((prev) => (prev === 'latest' ? 'oldest' : 'latest'))
  }

  const goToDetailPage = (Id, Category) => {
    if (Category === 'JOB_POSTING') {
      navigate(`/job/recruitment/post/${Id}`)
    } else if (Category === 'JOB_SEEKING') {
      navigate(`/job/job-seek/post/${Id}`)
    } else navigate(`/community/post/${Id}`)
  }

  return (
    <div>
      <div className='sm:text-[30px] font-bold flex justify-start mb-[20px] mt-10 text-[20px]'>
        {choiceBoard === '구인구직' ? '구인 | 구직' : '자유게시판'}
      </div>
      <div className='flex flex-row justify-end my-3'>
        <div className='flex gap-2'>
          <button onClick={handleDeleteSelected} className='text-dark-gray'>
            삭제
          </button>
          <div className='text-dark-gray'>|</div>
          <button className='text-main-pink' onClick={() => setShowModal(true)}>
            글 작성
          </button>
        </div>
      </div>
      <div className='border border-b-black'></div>
      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr className='h-12 border-b'>
            <th className='w-6 sm:w-10 '>
              <input type='checkbox' checked={isAllChecked} onChange={toggleAll} />
            </th>
            <th className='w-7 sm:w-10'>No</th>
            <th className='w-1/4 sm:w-1/2'>제목</th>
            <th>
              <button onClick={handleSortToggle}>
                <PostSortDropDown onSortChange={setSort} className='hidden' />
                날짜 <span className='text-[10px]'>{sort === 'latest' ? '▲' : '▼'}</span>
              </button>
            </th>
            {Array.isArray(sortedBoardData) &&
              sortedBoardData.some((item) => item.recruitmentCategory !== undefined) && (
                <th>카테고리</th>
              )}
            {Array.isArray(sortedBoardData) &&
              sortedBoardData.some((item) => item.commentCount !== undefined) && <th>댓글</th>}
            {Array.isArray(sortedBoardData) &&
              sortedBoardData.some((item) => item.viewCount !== undefined) && <th>조회수</th>}
            <th className='w-7 sm:w-10'>삭제</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sortedBoardData) && sortedBoardData.length > 0 ? (
            sortedBoardData.map((item, index) => (
              <tr
                key={item.boardId || item.recruitmentId}
                className='h-12 text-xs border-b sm:text-sm'
              >
                <td>
                  <input
                    type='checkbox'
                    checked={checkedItems.includes(item.boardId || item.recruitmentId)}
                    onChange={() => toggleCheck(item.boardId || item.recruitmentId)}
                  />
                </td>
                <td>{index + 1}</td>
                <td className='truncate max-w-[50px]'>
                  <button
                    onClick={() => {
                      goToDetailPage(item.boardId || item.recruitmentId, item.recruitmentCategory)
                    }}
                  >
                    {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                  </button>
                </td>
                <td className='text-nowrap'>{item.createdAt.split('T')[0]}</td>
                {item.recruitmentCategory !== undefined &&
                  (item.recruitmentCategory === 'JOB_POSTING' ? (
                    <td>
                      <BoardCategory label={'구인'} />
                    </td>
                  ) : (
                    <td>
                      <BoardCategory label={'구직'} />
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
            ))
          ) : (
            <tr>
              <td colSpan='8' className='py-10 text-center'>
                목록이 없습니다.
              </td>
            </tr>
          )}
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

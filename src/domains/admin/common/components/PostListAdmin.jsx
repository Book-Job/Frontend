import { useState } from 'react'
import BoardCategory from '../../../../components/web/BoardCategory'
import PostSortDropDown from '../../../../components/common/PostSortDropDown'
import PropTypes from 'prop-types'

const PostListAdmin = () => {
  const [sort, setSort] = useState('latest')

  return (
    <div>
      <div className='border border-b-black'></div>
      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr className='h-12 border-b'>
            <th className='w-6 sm:w-10 '>
              <input type='checkbox' />
            </th>
            <th className='w-7 sm:w-10'>No</th>
            <th className='w-1/6 sm:w-1/3'>제목</th>
            <th className='w-1/8 sm:w-1/5'>작성자</th>
            <th>카테고리</th>

            <th>
              <button>
                <PostSortDropDown onSortChange={setSort} className='hidden' />
                작성날짜 <span className='text-[10px]'>{sort === 'latest' ? '▲' : '▼'}</span>
              </button>
            </th>

            <th>조회수</th>
            <th>댓글</th>
            <th>차단</th>
            <th>원인</th>

            <th className='w-7 sm:w-10'>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-12 text-xs border-b sm:text-sm'>
            <td>
              <input type='checkbox' />
            </td>
            <td>1</td>
            <td className='truncate max-w-[50px]'>
              <button>title</button>
            </td>
            <td className='text-nowrap'>닉네임</td>
            <td className='text-nowrap'>date</td>
            <td>
              <BoardCategory label={'구인'} />
            </td>
            <td>
              <BoardCategory label={'구직'} />
            </td>
            <td>
              <div className='flex items-center justify-center h-4 gap-1 sm:gap-2'>comment</div>
            </td>
            <td>viewCount</td>
            <td>
              <button className='text-light-gray hover:text-main-pink'>✕</button>
            </td>
          </tr>

          <tr>
            <td colSpan='8' className='py-10 text-center'>
              목록이 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

PostListAdmin.propTypes = {
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

export default PostListAdmin

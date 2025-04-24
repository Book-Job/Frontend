import commentImg from '../../../../assets/icons/common/comment.svg'
import { useState } from 'react'
import useBoardStore from '../../../../store/mypage/useBoardStore'

const PostList = ({ mockData }) => {
  const [checkedItems, setCheckedItems] = useState([])
  const { choiceBoard } = useBoardStore()

  const toggleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const isAllChecked = mockData.length === checkedItems.length

  const toggleAll = () => {
    setCheckedItems(isAllChecked ? [] : mockData.map((item) => item.id))
  }

  const deleteItem = (id) => {
    alert(`ID ${id} 삭제`)
  }
  return (
    <div>
      <div className='sm:text-[30px] font-bold flex justify-start mb-[20px] mt-[40px] text-[20px]'>
        {choiceBoard === 'job' ? '구인 | 구직' : '자유게시판' }
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
            {mockData.some((item) => item.category !== undefined) && <th>카테고리</th>}
            {mockData.some((item) => item.comment !== undefined) && <th>댓글</th>}
            {mockData.some((item) => item.view !== undefined) && <th>조회수</th>}
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item, index) => (
            <tr key={item.id} className='h-12 border-b'>
              <td>
                <input
                  type='checkbox'
                  checked={checkedItems.includes(item.id)}
                  onChange={() => toggleCheck(item.id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              {item.category !== undefined &&
                ('구인' ? (
                  <td>
                    <span className='px-2 text-sm text-blue-500 border border-blue-500 rounded'>
                      구인
                    </span>
                  </td>
                ) : (
                  <td>
                    <span className='px-2 text-sm text-red-500 border border-red-500 rounded'>
                      구직
                    </span>
                  </td>
                ))}
              {item.comment !== undefined && (
                <td>
                  <div className='flex items-center justify-center h-4 gap-1 sm:gap-2'>
                    <img src={commentImg} alt='commentImg' className='h-3 sm:h-4' />
                    {item.comment}
                  </div>
                </td>
              )}
              {item.view !== undefined && <td>{item.view}</td>}
              <td>
                <button
                  onClick={() => deleteItem(item.id)}
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

export default PostList

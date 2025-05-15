import { useEffect, useState } from 'react'
import foldArrow from '../../../../assets/icons/common/common_fold_arrow.svg'
import spreadArrow from '../../../../assets/icons/common/common_spread_arrow.svg'
import useAuthStore from '../../../../store/login/useAuthStore'
const UserPosts = () => {
  const { user } = useAuthStore()
  const [isFolded, setIsFolded] = useState(true)

  const toggleArrow = () => {
    setIsFolded((prev) => !prev)
  }

  return (
    <div className='flex flex-col'>
      <span className='sm:text-[30px] text-[24px] block mb-[60px]'>
        {user?.nickname ?? '닉네임 없음'}님이 작성한 글
      </span>

      <div className='flex flex-col gap-4 max-w-[1440px] w-full px-4 sm:px-10 lg:px-[250px] mx-auto'>
        <div className='w-full h-[1px] bg-black' />

        <table className='w-full text-left'>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>
                <button
                  onClick={toggleArrow}
                  className='flex items-center gap-1 focus:outline-none'
                >
                  날짜
                  <img
                    src={isFolded ? foldArrow : spreadArrow}
                    alt='정렬 화살표'
                    className='w-[12px] h-[12px]'
                  />
                </button>
              </th>
              <th>글쓴이</th>
              <th>카테고리</th>
            </tr>
          </thead>
        </table>

        <div className='w-full h-[1px] bg-dark-gray' />
      </div>
    </div>
  )
}

export default UserPosts

// import adminIcon from '../../../../assets/icons/common/common_admin.svg'
import { RiAdminFill } from 'react-icons/ri'

const AdminSideBarContent = () => {
  const sidebarData = {
    '전체글 분석': ['작성글 분석', '댓글', '신고 글'],
    베스트: ['인기 게시글', 'API'],
    '사용자 분석': ['가입자', '작성자 Top 5'],
    기타: ['마감 기능', '댓글 숨김/해제', '바로가기'],
  }

  const Line = () => <hr className='my-4 border-b-2 rounded-lg border-dark-gray' />

  const SubList = ({ items }) => (
    <ul className='mt-2 space-y-2 text-sm font-normal'>
      {items.map((item, idex) => (
        <li key={idex}>
          <button className='w-full text-start hover:text-dark-pink'>{item}</button>
        </li>
      ))}
    </ul>
  )
  return (
    <div className=''>
      <p className='flex items-center font-bold text-start'>
        <div className='flex mr-3 text-xl sm:text-2xl'>
          <RiAdminFill />
        </div>
        <p className=' break-keep overflow-wrap-break-word'>관리자 페이지</p>
      </p>
      <ul className='space-y-6 sm:space-y-10'>
        {Object.keys(sidebarData).map((category, index) => (
          <li key={index} className='font-bold text-start'>
            <Line />
            {category}
            {sidebarData[category].length > 0 && <SubList items={sidebarData[category]} />}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminSideBarContent

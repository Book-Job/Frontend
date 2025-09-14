import useIsMobile from '../../../../hooks/header/useIsMobile'
import adminIcon from '../../../../assets/icons/common/common_admin.svg'
const MiniSideBar = () => {
  const isMobile = useIsMobile()

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
          <button className='hover:text-dark-pink'>{item}</button>
        </li>
      ))}
    </ul>
  )

  return (
    <div>
      {isMobile ? null : (
        <div className='w-2/12 h-full p-4 shadow-md max-w-60 min-w-36 bg-light-pink'>
          <p className='font-bold'>
            <img src={adminIcon} alt='adminIcon' className='inline-block mr-3 w-7 h-7' />
            관리자 페이지
          </p>
          <ul className='space-y-10'>
            {Object.keys(sidebarData).map((category, index) => (
              <li key={index} className='text-lg font-bold text-start'>
                <Line />
                {category}
                {sidebarData[category].length > 0 && <SubList items={sidebarData[category]} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MiniSideBar

import useIsMobile from '../../../../hooks/header/useIsMobile'
import AdminSideBar from '../../common/components/AdminSideBar'

const AdminMain = () => {
  const isMobile = useIsMobile()
  return (
    <div>
      <h1 className='bg-gray-300'>관리자 메인 페이지</h1>
      {isMobile ? null : <AdminSideBar />}
    </div>
  )
}

export default AdminMain

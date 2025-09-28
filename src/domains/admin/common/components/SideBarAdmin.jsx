import useIsMobile from "../../../../hooks/header/useIsMobile"
import SideBarContentAdmin from "./SideBarContentAdmin"

const SideBarAdmin = () => {
  const isMobile = useIsMobile()

  return (
    <div>
      {isMobile ? null : (
        <div className='w-2/12 h-full p-4 shadow-md max-w-60 min-w-36 bg-light-pink'>
          <SideBarContentAdmin />
        </div>
      )}
    </div>
  )
}

export default SideBarAdmin

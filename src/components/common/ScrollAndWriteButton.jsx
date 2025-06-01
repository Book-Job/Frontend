import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import arrow from '../../assets/icons/common/common_arrow_up.svg'
import writePencil from '../../assets/icons/common/common_pencil2.svg'
import ChooseWriteForm from './ChooseWriteForm'

const ScrollBtn = () => {
  const [showModal, setShowModal] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const navigate = useNavigate()

  const handleCreatePostClick = () => setShowModal(true)
  const handleTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleSelect = (type) => {
    const paths = {
      free: ROUTER_PATHS.WRITE_COMMUNITY_POST,
      recruitment: ROUTER_PATHS.WRITE_RECRUITMENT_POST,
      jobsearch: ROUTER_PATHS.WRITE_JOB_SEARCH_POST,
    }
    navigate(paths[type])
    setShowModal(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const btnBaseClass =
    'w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] flex items-center justify-center ' +
    'rounded-full backdrop-blur-md bg-white/30 border border-light-gray shadow-lg ' +
    'hover:scale-110 transition-transform duration-200 z-40'

  return (
    <>
      <button
        style={{ backgroundColor: '#ec4899' }}
        className={`fixed right-4 bottom-[80px] sm:bottom-[130px] ${btnBaseClass}`}
        onClick={handleCreatePostClick}
        title='글 작성'
      >
        <img src={writePencil} alt='글 작성 버튼' className='w-[20px] h-[20px]' />
      </button>
      <button
        className={`fixed right-4 bottom-[20px] sm:bottom-[65px] ${btnBaseClass} 
          transition-all duration-300 ease-in-out
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
        onClick={handleTop}
        title='맨 위로'
      >
        <img src={arrow} alt='위로 올라가는 버튼' className='w-[20px] h-[20px]' />
      </button>
      {showModal && <ChooseWriteForm onSelect={handleSelect} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default ScrollBtn

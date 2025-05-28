<<<<<<< HEAD
import React, { useState } from 'react'
=======
import { useState, useEffect } from 'react'
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import arrow from '../../assets/icons/common/common_arrow_up.svg'
import pencil from '../../assets/icons/common/common_pencil.svg'
import ChooseWriteForm from './ChooseWriteForm'

const ScrollBtn = () => {
<<<<<<< HEAD
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleCreatePostClick = () => {
    setShowModal(true)
  }
  const handleTop = () => {
    const scrollContainer = document.querySelector('#root')
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const handleSelect = (type) => {
    if (type === 'free') {
      navigate(ROUTER_PATHS.WRITE_COMMUNITY_POST)
    } else if (type === 'recruitment') {
      navigate(ROUTER_PATHS.WRITE_RECRUITMENT_POST)
    } else if (type === 'jobsearch') {
      navigate(ROUTER_PATHS.WRITE_JOB_SEARCH_POST)
    }
    setShowModal(false)
  }

  return (
    <>
      <button
        className='fixed right-0 bottom-[150px] z-[9999] border border-dark-gray bg-transparent rounded-full w-[60px] h-[60px] flex flex-col justify-center items-center gap-1 transition-all ease-in-out duration-300 sm:right-2 sm:bottom-[130px]'
        onClick={handleCreatePostClick}
      >
        <img className='w-[23px] h-[23px]' src={pencil} alt='글 작성 버튼' />
        <span className='text-[10px] font-bold text-dark-gray'>글 작성</span>
      </button>

      <button
        className='fixed right-0 bottom-[150px] z-[9999] border border-dark-gray bg-transparent rounded-full w-[60px] h-[60px] flex flex-col justify-center items-center gap-1 transition-all ease-in-out duration-300 sm:right-2 sm:bottom-[65px]'
        onClick={handleTop}
      >
        <img className='w-[23px] h-[23px]' src={arrow} alt='위로 올리는 버튼' />
      </button>

=======
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
    'hover:scale-110 transition-transform duration-200 z-[9999]'

  return (
    <>
      <button
        className={`fixed right-4 bottom-[80px] sm:bottom-[130px] ${btnBaseClass}`}
        onClick={handleCreatePostClick}
        title='글 작성'
      >
        <img src={pencil} alt='글 작성 버튼' className='w-[20px] h-[20px]' />
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
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
      {showModal && <ChooseWriteForm onSelect={handleSelect} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default ScrollBtn

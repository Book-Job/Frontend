import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../routes/RouterPath'
import arrow from '../../assets/icons/common/common_arrow_up.svg'
import pencil from '../../assets/icons/common/common_pencil.svg'
import ChooseWriteForm from './ChooseWriteForm'

const ScrollBtn = () => {
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

      {showModal && <ChooseWriteForm onSelect={handleSelect} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default ScrollBtn

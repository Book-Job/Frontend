import React from 'react'

const ChooseWriteForm = ({ onSelect, onClose }) => {
  const handleSelect = (type) => {
    if (onSelect) {
      onSelect(type)
    }
  }

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 flex flex-col items-center gap-6'>
        <h2 className='text-xl font-bold text-center'>어떤 게시글을 작성하시겠어요?</h2>
        <div className='flex flex-col gap-4 w-full'>
          <button
            className='w-full py-3 rounded-lg bg-main-pink text-white font-semibold hover:bg-pink-500 transition'
            onClick={() => handleSelect('free')}
          >
            자유게시판
          </button>
          <button
            className='w-full py-3 rounded-lg bg-main-pink text-white font-semibold hover:bg-pink-500 transition'
            onClick={() => handleSelect('recruitment')}
          >
            구인
          </button>
          <button
            className='w-full py-3 rounded-lg bg-main-pink text-white font-semibold hover:bg-pink-500 transition'
            onClick={() => handleSelect('jobsearch')}
          >
            구직
          </button>
        </div>
        <button className='text-sm text-gray-500 hover:text-gray-700 mt-4' onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default ChooseWriteForm

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
        <div className='flex flex-col w-full gap-4'>
          <button
            className='w-full py-3 font-semibold text-white transition rounded-lg bg-main-pink hover:bg-pink-500'
            onClick={() => handleSelect('free')}
          >
            자유게시판
          </button>
          <button
            className='w-full py-3 font-semibold text-white transition rounded-lg bg-main-pink hover:bg-pink-500'
            onClick={() => handleSelect('recruitment')}
          >
            구인
          </button>
          <button
            className='w-full py-3 font-semibold text-white transition rounded-lg bg-main-pink hover:bg-pink-500'
            onClick={() => handleSelect('jobsearch')}
          >
            구직
          </button>
        </div>
        <button className='mt-4 text-sm text-gray-500 hover:text-gray-700' onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default ChooseWriteForm

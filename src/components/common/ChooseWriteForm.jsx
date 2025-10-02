import { MessageCircle, Briefcase, Search } from 'lucide-react'

const ChooseWriteForm = ({ onSelect, onClose }) => {
  const handleSelect = (type) => {
    if (onSelect) onSelect(type)
  }

  const options = [
    {
      type: 'free',
      label: '자유게시판',
      desc: '가볍게 소통해보세요',
      icon: <MessageCircle size={28} className='text-blue-500' />,
    },
    {
      type: 'recruitment',
      label: '구인',
      desc: '팀원이나 동료를 찾아보세요',
      icon: <Briefcase size={28} className='text-main-pink' />,
    },
    {
      type: 'jobsearch',
      label: '구직',
      desc: '원하는 일자리를 찾아보세요',
      icon: <Search size={28} className='text-green-500' />,
    },
  ]

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40'>
      <div className='bg-white rounded-2xl shadow-2xl w-[80%] max-w-md p-8'>
        <h2 className='text-xl font-bold text-center mb-6'>어떤 게시글을 작성하시겠어요?</h2>

        <div className='grid gap-4'>
          {options.map(({ type, label, desc, icon }) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className='flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition bg-gray-50 hover:bg-gray-100 text-left'
            >
              <div className='flex-shrink-0'>{icon}</div>
              <div className='flex flex-col'>
                <span className='font-semibold text-gray-800'>{label}</span>
                <span className='text-sm text-gray-500'>{desc}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className='w-full mt-4 py-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition'
        >
          닫기
        </button>
      </div>
    </div>
  )
}

export default ChooseWriteForm

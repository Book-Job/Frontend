import { useNavigate } from 'react-router-dom'
import useFreeDraftStore from '../../../../store/mypage/useFreeDraftStore'
import BoardCategory from './../../../../components/web/BoardCategory'

const MyDraftsList = ({ draftsListData, onDraftClick }) => {
  const { deleteFreeDraft } = useFreeDraftStore()
  const navigate = useNavigate()
  const getPreviewText = (text) => {
    const fullText = text || ''
    const preview = fullText.slice(0, 50)
    return fullText.length > 50 ? preview + '...' : preview || '내용 없음'
  }

  const getCategoryProps = (draftType) => {
    switch (draftType) {
      case 'community':
        return { label: '자유게시판', bgColor: '#ECFDF5', labelColor: '#065F46', width: '80px' }
      case 'job':
        return { label: '구인', bgColor: '#EBF7FF', labelColor: '#2563EB', width: '60px' }
      default:
        return { label: '기타', bgColor: '#F3F4F6', labelColor: '#374151', width: '60px' }
    }
  }

  return (
    <div className='w-full sm:max-w-[940px] mx-auto px-4 sm:px-10'>
      {draftsListData.length === 0 ? (
        <p className='text-center text-dark-gray'>임시 저장된 글이 없습니다.</p>
      ) : (
        draftsListData.map((item) => (
          <div
            key={item.id}
            onClick={() => onDraftClick(item)}
            className='cursor-pointer pt-[40px]'
          >
            <div className='flex pb-5 sm:pb-[30px] items-center justify-between'>
              <div className='sm:text-[30px] font-semibold text-[20px]'>
                {item.title || '제목 없음'}
              </div>
              <BoardCategory {...getCategoryProps(item.draftType || 'community')} />
            </div>
            <div className='flex sm:text-[24px] text-[16px] text-start'>
              {getPreviewText(item.text)}
            </div>
            <div className='flex justify-between py-3 sm:py-6'>
              <span className='text-main-pink sm:text-[20px] text-[14px]'>{item.date}</span>
              <span
                className='text-dark-gray sm:text-[20px] text-[14px] px-3 py-1 rounded-[5px] hover:bg-main-pink/10 transition'
                onClick={(e) => {
                  e.stopPropagation()
                  deleteFreeDraft(item.id)
                }}
              >
                삭제
              </span>
            </div>
            <div className='border border-light-gray'></div>
          </div>
        ))
      )}
    </div>
  )
}

export default MyDraftsList

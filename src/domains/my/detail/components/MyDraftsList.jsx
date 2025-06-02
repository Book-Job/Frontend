import useDraftStore from '../../../../store/mypage/useDraftStore'

// 날짜를 yyyy-mm-dd 형식으로 포맷팅
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    return date
      .toLocaleDateString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('. ')
      .join('-')
      .slice(0, -1) // '2025. 06. 02.' -> '2025-06-02'
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error)
    return '날짜 오류'
  }
}

const MyDraftsList = ({ draftsListData, onDraftClick }) => {
  const { deleteDraft } = useDraftStore()

  // JSON 형태의 text에서 텍스트 미리보기 추출
  const getPreviewText = (text) => {
    try {
      const rawContent = JSON.parse(text)
      const blocks = rawContent.blocks || []
      const preview = blocks
        .map((block) => block.text)
        .join(' ')
        .slice(0, 100) // 100자 제한
      return preview || '내용 없음'
    } catch (error) {
      console.error('텍스트 미리보기 변환 오류:', error)
      return '내용 미리보기 오류'
    }
  }

  return (
    <div className='w-full sm:max-w-[940px] mx-auto px-4 sm:px-10'>
      {draftsListData.length === 0 ? (
        <p className='text-center text-dark-gray'>임시 저장된 글이 없습니다.</p>
      ) : (
        draftsListData.map((item) => (
          <div key={item.id} onClick={() => onDraftClick(item)} className='cursor-pointer'>
            <div className='sm:text-[30px] font-semibold flex justify-start mb-[30px] mt-[40px] text-[20px]'>
              {item.title || '제목 없음'}
            </div>
            <div className='flex sm:text-[24px] text-[16px]'>{getPreviewText(item.text)}</div>
            <div className='flex justify-between my-[24px]'>
              <span className='text-main-pink sm:text-[20px] text-[14px]'>
                {formatDate(item.date)}
              </span>
              <span
                className='text-dark-gray sm:text-[20px] text-[14px] px-3 py-1 rounded-[5px]
        hover:bg-main-pink/10 transition'
                onClick={(e) => {
                  e.stopPropagation()
                  deleteDraft(item.id)
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

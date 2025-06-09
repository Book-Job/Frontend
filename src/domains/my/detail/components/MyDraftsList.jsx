import useDraftStore from '../../../../store/mypage/useFreeDraftStore'
import BoardCategory from './../../../../components/web/BoardCategory'

const MyDraftsList = ({ draftsListData, onDraftClick }) => {
  const { deleteDraft } = useDraftStore()

  const getPreviewText = (text) => {
    try {
      const rawContent = JSON.parse(text)
      const blocks = rawContent.blocks || []
      const fullText = blocks.map((block) => block.text).join(' ')
      const preview = fullText.slice(0, 50)
      return fullText.length > 50 ? preview + '...' : preview || '내용 없음'
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
          <div
            key={item.id}
            onClick={() => onDraftClick(item)}
            className='cursor-pointer pt-[40px] '
          >
            <div className='flex pb-5 sm:pb-[30px] items-center justify-between'>
              <div className='sm:text-[30px] font-semibold text-[20px]'>
                {item.title || '제목 없음'}
              </div>
              <BoardCategory
                label={'구인'}
                bgColor={'#EBF7FF'}
                labelColor={'#2563EB'}
                width={'60px'}
              />
              {/* <BoardCategory
                label={'구인'}
                bgColor={'#FFEFEB'}
                labelColor={'#DC2626'}
                width={'60px'}
              />
              <BoardCategory label={'자유게시판'} bgColor={'#ECFDF5'} /> */}
            </div>
            <div className='flex sm:text-[24px] text-[16px] text-start'>
              {getPreviewText(item.text)}
            </div>
            <div className='flex justify-between py-3 sm:py-6'>
              <span className='text-main-pink sm:text-[20px] text-[14px]'>{item.date}</span>
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

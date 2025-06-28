const RecentList = () => {
  return (
    <div className='w-full sm:max-w-[940px] mx-auto px-4 sm:px-10'>
      {draftsListData.length === 0 ? (
        <p className='text-center text-dark-gray'>최근본 목록이 없습니다.</p>
      ) : (
        draftsListData.map((item) => {
          const previewText = getPreviewText(item.text)
          const hasImage = item.text && item.text.includes('<img')

          return (
            <div
              key={item.id}
              onClick={() => onDraftClick(item)}
              className='pt-8 cursor-pointer sm:pt-10 '
            >
              <div className='flex pb-5 sm:pb-[30px] items-center justify-between'>
                <div className='sm:text-[26px] font-semibold text-[20px]'>
                  {item.title || '제목 없음'}
                </div>
                <BoardCategory {...getCategoryProps(item.draftType || 'community')} />
              </div>
              <div className='flex items-center text-base sm:text-xl text-dark-gray text-start'>
                {hasImage && previewText === '내용 없음' ? '' : previewText}
                {hasImage && (
                  <div>
                    <BsCardImage className='inline-block mx-2 text-xl sm:text-2xl' /> 이미지
                  </>
                )}
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
          )
        })
      )}
    </div>
  )
}

export default RecentList

import PropTypes from 'prop-types'
import useFreeDraftStore from '../../../../store/mypage/useFreeDraftStore'
import BoardCategory from './../../../../components/web/BoardCategory'
import { BsCardImage } from 'react-icons/bs'
import PostSortDropDown from '../../../../components/common/PostSortDropDown'
import { useMemo, useState } from 'react'

const MyDraftsList = ({ draftsListData, onDraftClick }) => {
  const { deleteFreeDraft } = useFreeDraftStore()
  const [sort, setSort] = useState('latest')
  const getPreviewText = (text) => {
    if (!text) return '내용 없음'

    let plainText = text.replace(/<[^>]+>/g, '')

    const preview = plainText.slice(0, 50)
    return plainText.length > 50 ? preview + '...' : preview || '내용 없음'
  }

  const getCategoryProps = (draftType) => {
    switch (draftType) {
      case 'community':
        return { label: '자유게시판', bgColor: '#ECFDF5', labelColor: '#065F46', width: '80px' }
      case 'jobPostings':
        return { label: '구인', bgColor: '#EBF7FF', labelColor: '#2563EB', width: '60px' }
      case 'jobSeekings':
        return { label: '구직', bgColor: '#FFEFEB', labelColor: '#DC2626', width: '60px' }
      default:
        return { label: '기타', bgColor: '#cecece', labelColor: '#2e2e2e', width: '60px' }
    }
  }
  const sortedDrafts = useMemo(() => {
    console.log('draftsListData', draftsListData)

    return draftsListData.sort((a, b) => {
      return sort === 'latest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    })
  }, [sort])
  return (
    <div className='w-full sm:max-w-[940px] mx-auto px-4 sm:px-10'>
      {sortedDrafts.length > 0 && (
        <div className='flex justify-end mx-auto'>
          <PostSortDropDown onSortChange={setSort} />
        </div>
      )}
      {draftsListData.length === 0 ? (
        <p className='text-center text-dark-gray'>임시 저장된 글이 없습니다.</p>
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
                  <>
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

MyDraftsList.propTypes = {
  draftsListData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      draftType: PropTypes.string,
    }),
  ).isRequired,
  onDraftClick: PropTypes.func.isRequired,
}

export default MyDraftsList

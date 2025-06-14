import { useNavigate } from 'react-router-dom'
import issueFire from '../../../../assets/icons/common/common_issue_fire.svg'
import comment from '../../../../assets/icons/common/comment.svg'
import viewGray from '../../../../assets/icons/common/common_view_gray.svg'
const BestList = ({ boardName, bestList }) => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col w-full sm:max-w-[940px]'>
      <div className='flex sm:mb-12 mb-7'>
        <img src={issueFire} alt='issueFire' className='w-6 h-6 mr-3 sm:mr-5 ms:w-11 sm:h-11' />
        <div className='text-xl font-bold sm:text-3xl'>{boardName} 베스트</div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-x-20 sm:grid-flow-col sm:grid-rows-5'>
        {bestList.map(({ title, boardId, jobPostingId, commentCount, viewCount }, index) => {
          return (
            <div key={index} className='flex items-center'>
              <p className='w-5 sm:text-[20px] text-[15px] font-medium'>{index + 1}.</p>
              <div className='flex sm:text-[20px] text-[15px] font-medium items-center justify-between w-full ml-3'>
                <button
                  className='justify-start w-auto line-clamp-1'
                  onClick={
                    boardId
                      ? () => navigate(`/community/post/${boardId}`)
                      : () => navigate(`/job/recruitment/post/${jobPostingId}`)
                  }
                >
                  {title}
                </button>
                <div className='flex flex-row items-center justify-between sm:min-w-14 min-w-10'>
                  {boardId ? (
                    <>
                      <img
                        src={comment}
                        alt='comment'
                        className='sm:w-[19px] w-[15px] h-[13px] sm:h-[17px] mr-2'
                      />
                      {commentCount}
                    </>
                  ) : (
                    <>
                      <img
                        src={viewGray}
                        alt='viewCount'
                        className='sm:w-[19px] w-[15px] h-[13px] sm:h-[17px] mr-2'
                      />
                      {viewCount}
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BestList

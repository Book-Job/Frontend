import bookmarkIcon from '../../../assets/icons/common/common_bookmark_gray.svg'
import DetailPostLine from '../common/components/DetailPostLine'
import JobOption from '../../../components/web/JobOption'
import LastFormLine from '../common/components/LastFormLine'
import ShareViews from '../../../components/web/ShareViews'
import share from '../../../assets/icons/common/common_share.svg'
import viewPink from '../../../assets/icons/common/common_view_pink.svg'
import WorkBoard from '../../../components/web/WorkBoard'

const jobOptions = [
  { title: '근무형태', answer: '프리랜서' },
  { title: '직군', answer: '편집자' },
  { title: '경력', answer: '경력 3~8년' },
  { title: '연락처', answer: '이메일, SNS' },
]

const DetailJobSearchPost = () => {
  return (
    <>
      <div className='mx-[250px]'>
        <div className='flex justify-between items-center mt-[40px]'>
          <span className='text-[24px] font-semibold'>푸른숲</span>
          <img
            src={bookmarkIcon}
            alt='북마크 아이콘'
            className='w-[16px] h-[23px] cursor-pointer'
          />
        </div>
        <div className='flex justify-between items-center mt-[12px]'>
          <span className='text-[40px] font-bold'>편집자 프리랜서 해드립니다.</span>
          <span className='text-[20px] font-bold text-gray-8e8e8e'>[구인/구직]</span>
        </div>
        <DetailPostLine />
        <div className='flex flex-col mt-4'>
          {jobOptions.map(({ title, answer }, index) => (
            <JobOption
              key={index}
              optionTitle={title}
              optionAnswer={answer}
              className='mb-[17px]'
            />
          ))}
        </div>
        <LastFormLine />
        <div className='ml-[832px] mt-[13px]'>
          <ShareViews icon={share} label='공유' textColor='text-gray-8e8e8e' />
          <ShareViews icon={viewPink} label='134' textColor='text-main-color-pink' />
        </div>

        <LastFormLine />
        <span className='block font-bold text-[28px] mr-[861px] mt-[30px] '>관련글</span>
        <div className='block mb-[40px]'>
          <WorkBoard
            title='편집자 프리랜서 모집'
            name='푸른숲'
            date='2024-04-03'
            like={false}
            view={134}
            popular1={true}
            joboffer1={false}
            history1={true}
            jobsearch1={true}
            othersite1={false}
            worktype1={true}
            onClick={() => console.log('게시글 클릭됨')}
            className='cursor-pointer'
          />
        </div>
      </div>
    </>
  )
}

export default DetailJobSearchPost

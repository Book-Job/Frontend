import issueFire from '../../../../assets/icons/common/common_issue_fire.svg'
const BestList = () => {
  const bestList = [
    {
      title: '오늘 회사에서 제안 받았어요',
      path: '/',
    },
    {
      title: '여기 어때요?',
      path: '/',
    },
    {
      title: '우리회사 대환장파티 열렸다',
      path: '/',
    },
    {
      title: '영상정보처리기기 운영/관리 방침',
      path: '/',
    },
  ]
  return (
    <div>
      <div className='flex justify-center'>
        <img src={issueFire} alt='issueFire' className='w-11 h-11' />
        <div className='text-3xl font-bold'>자유게시판 베스트</div>
      </div>
      <div>
        {bestList.map(({ title, path }, idex) => {
          return <p>{title}</p>
        })}
      </div>
    </div>
  )
}

export default BestList

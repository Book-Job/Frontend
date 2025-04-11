import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'

const FindIDCompletePage = () => {
  return (
    <div>
      ID 찾기 완료
      <div className='flex flex-col items-center'>
        <PageTitle title={'아이디 찾기'} subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'} />
        <div className='flex justify-center w-full'>
          <PageBox>
          </PageBox>
        </div>
      </div>
    </div>
  )
}

export default FindIDCompletePage

import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'
import Button from '../../../components/web/Button'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import PinkButton from './../../../components/web/PinkButton'
import FindLink from '../common/components/FindLink'
import useFindIDStore from '../../../store/find/useFindIDStore'
import useIsMobile from '../../../hooks/header/useIsMobile'

const FindIDCompletePage = () => {
  const { findID } = useFindIDStore()

  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const displayID = findID?.loginId || findID || 'ID를 찾을 수 없습니다.'
  const formContent = (
    <div className='w-full'>
      <div className='flex justify-start text-2xl font-bold sm:text-3xl'>
        회원님의 아이디를 확인해주세요
      </div>
      <div className='flex justify-start text-[28px] mt-14 mb-16 font-medium'>{displayID}</div>
      <div className='flex gap-3'>
        <PinkButton label='로그인' onClick={() => navigate(ROUTER_PATHS.LOGIN_MAIN)} />
        <Button
          size='medium'
          label='비밀번호 찾기'
          onClick={() => navigate(ROUTER_PATHS.FIND_PW)}
        />
      </div>
      <div>
        <FindLink
          title={'아이디 전체가 궁금해요!'}
          onClick={() => navigate(ROUTER_PATHS.MAIN_PAGE)}
          linkName={'문의하기'}
        />
      </div>
    </div>
  )
  return (
    <div>
      <div className='flex flex-col items-center'>
        {isMobile ? (
          <PageTitle subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'} />
        ) : (
          <PageTitle
            title={'아이디 찾기'}
            subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'}
          />
        )}
        <div className='flex justify-center w-full'>
          {isMobile ? formContent : <PageBox>{formContent}</PageBox>}
        </div>
      </div>
    </div>
  )
}

export default FindIDCompletePage

import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import PageTitle from '../../Find/common/components/PageTitle'
import Button from './../../../components/web/Button'
import ProfileInfo from './components/ProfileInfo'

const EditProfile = () => {
  const navigate = useNavigate()
  return (
    <div>
      <PageTitle title={'내 정보'} />
      <div className='flex justify-center'>
        <div className='w-[580px]'>
          <div className='flex flex-col w-full gap-12 '>
            <ProfileInfo title={'닉네임'} content={'내가짱짱'} edit={'수정'} />
            <ProfileInfo
              title={'이메일'}
              content={'adgfe@naver.com'}
              text={'인증된 이메일입니다'}
            />
            <ProfileInfo title={'로그인 아이디'} content={'bookjobgogogo'} />
            <div className='flex justify-between py-2 text-lg border-dark-gray'>
              <span className='text-[22px] font-semibold'>비밀번호</span>
              <button className='font-bold text-main-pink'onClick={() => navigate(ROUTER_PATHS.MY_EDIT_PW)}>변경</button>
            </div>
            <div className='flex justify-between'>
              <Button size='semiMedium' label='회원탈퇴' />
              <Button size='semiMedium' label='로그아웃' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile

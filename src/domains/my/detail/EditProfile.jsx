import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import PageTitle from '../../Find/common/components/PageTitle'
import Button from './../../../components/web/Button'
import ProfileInfo from './components/ProfileInfo'
import { useEffect, useState } from 'react'
import { getMyProfileData } from '../services/userMyDataServices'
import Spinner from './../../../components/web/Spinner.jsx'

const EditProfile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()

  const handleMyData = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await getMyProfileData(token)
      console.log('마이프로필 데이터 확인:', response)
      if (response.data && response.data.message === 'success') {
        console.log('마이프로필 데이터 성공:', response.data)
        setUserData(response.data)
      } else {
        console.log('마이프로필 데이터 오류:', response.data)
      }
    } catch (error) {
      console.error('마이프로필 데이터 불러오기 오류:', error)
    }
  }
  useEffect(() => {
    handleMyData()
  }, [])

  if (!userData) {
    return <div className=''>로딩 중...<Spinner></Spinner></div>
  }
  
  return (
    <div>
      <PageTitle title={'내 정보'} />
      <div className='flex justify-center'>
        <div className='w-[580px]'>
          <div className='flex flex-col w-full gap-12 '>
            <ProfileInfo title={'닉네임'} content={userData.data.nickname} edit={'수정'} />
            <ProfileInfo
              title={'이메일'}
              content={userData.data.email}
              text={'인증된 이메일입니다'}
            />
            <ProfileInfo title={'로그인 아이디'} content={userData.data.loginId} />
            <div className='flex justify-between py-2 text-lg border-dark-gray'>
              <span className='text-[22px] font-semibold'>비밀번호</span>
              <button
                className='font-bold text-main-pink'
                onClick={() => navigate(ROUTER_PATHS.MY_EDIT_PW)}
              >
                변경
              </button>
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

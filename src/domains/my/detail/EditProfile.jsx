import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import PageTitle from '../../Find/common/components/PageTitle'
import Button from './../../../components/web/Button'
import ProfileInfo from './components/ProfileInfo'
import { useEffect, useState } from 'react'
import { getMyProfileData, patchNicknameCh } from '../services/userMyDataServices'
import Spinner from './../../../components/web/Spinner.jsx'
import { getJoinCheckNickname } from '../../login/services/userJoinServices.jsx'

const EditProfile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [serverError, setServerError] = useState(null)

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
        setServerError(response.data?.message || '프로필 데이터를 불러오지 못했습니다.')
      }
    } catch (error) {
      console.error('마이프로필 데이터 불러오기 오류:', error)
      setServerError(error.message || '프로필 데이터를 불러오지 못했습니다.')
    }
  }

  const handleNickName = async (newNickname) => {
    const token = localStorage.getItem('accessToken')
    setServerError(null)
    try {
      const response = await patchNicknameCh(token, newNickname)
      console.log('닉네임 변경 데이터 확인:', response)
      if (response.data && response.data.message === 'success') {
        console.log('닉네임 변경 데이터 성공:', response.data)
        setUserData((prev) => ({
          ...prev,
          data: { ...prev.data, nickname: newNickname },
        }))
        setServerError(null)
        alert('닉네임이 성공적으로 변경되었습니다!')
      } else {
        console.log('닉네임 변경 데이터 오류:', response.data)
        setServerError(response.data?.message || '닉네임 변경에 실패했습니다.')
      }
    } catch (error) {
      console.error('닉네임 변경 데이터 불러오기 오류:', error)
      setServerError(error.message || '닉네임 변경 중 오류가 발생했습니다.')
    }
  }

  const handleCheckNickname = async (nickname) => {
    try {
      const response = await getJoinCheckNickname(nickname)
      console.log('닉네임 중복 확인 응답:', response.data)
      return response
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error)
      throw error
    }
  }

  useEffect(() => {
    handleMyData()
  }, [])

  if (!userData) {
    return (
      <div className='flex items-center justify-center h-auto'>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <PageTitle title={'내 정보'} />
      <div className='flex justify-center'>
        <div className='w-[580px]'>
          <div className='flex flex-col w-full gap-12 '>
            <ProfileInfo
              title={'닉네임'}
              content={userData.data.nickname}
              edit={'수정'}
              onSave={handleNickName}
              onCheckNickname={handleCheckNickname}
              serverError={serverError}
            />
            <ProfileInfo
              title={'이메일'}
              content={userData.data.email}
              text={'인증된 이메일입니다'}
            />
            <ProfileInfo title={'로그인 아이디'} content={userData.data.loginId} />
            <div className='flex justify-between py-2 text-lg border-dark-gray'>
              <span className='text-[22px] font-semibold'>비밀번호</span>
              <button
                className='font-bold text-main-pink hover:text-pink-600'
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

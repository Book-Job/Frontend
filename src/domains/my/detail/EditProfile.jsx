import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import PageTitle from '../../Find/common/components/PageTitle'
import Button from './../../../components/web/Button'
import ProfileInfo from './components/ProfileInfo'
import { useEffect, useState } from 'react'
import { deleteMember, getMyProfileData, patchNicknameCh } from '../services/userMyDataServices'
import Spinner from './../../../components/web/Spinner.jsx'
import { getJoinCheckNickname } from '../../login/services/useJoinServices.js'
import useAuthStore from '../../../store/login/useAuthStore.js'
import MembershipPwCheck from './components/MembershipPwCheck.jsx'
import ToastService from '../../../utils/toastService.js'
import useIsMobile from '../../../hooks/header/useIsMobile.js'
import useModalStore from '../../../store/modal/useModalStore.js'
import { HELP_DESK_URL } from '../../../utils/urls.js'

const EditProfile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [serverError, setServerError] = useState(null)
  const { logout, updateNickname } = useAuthStore()
  const isMobile = useIsMobile()
  const { openModal } = useModalStore()
  const [alertState, setAlertState] = useState({
    isOpen: false,
    onButtonClick: null,
  })
  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }))
  }

  const handleMyData = async () => {
    try {
      const response = await getMyProfileData()
      if (response.data && response.data.message === 'success') {
        setUserData(response.data)
      } else {
        setServerError(response.data?.message || '프로필 데이터를 불러오지 못했습니다.')
      }
    } catch (error) {
      console.error('마이프로필 데이터 불러오기 오류:', error)
      setServerError(error.message || '프로필 데이터를 불러오지 못했습니다.')
    }
  }

  const handleNickName = async (newNickname) => {
    setServerError(null)
    try {
      const response = await patchNicknameCh(newNickname)
      if (response.data && response.data.message === 'success') {
        setUserData((prev) => ({
          ...prev,
          data: { ...prev.data, nickname: newNickname },
        }))
        updateNickname(newNickname)
        setServerError(null)
        ToastService.success('닉네임이 성공적으로 변경되었습니다!')
      } else {
        setServerError(response.data?.message || '닉네임 변경에 실패했습니다.')
      }
    } catch (error) {
      console.error('닉네임 변경 데이터 불러오기 오류:', error)
      setServerError(error.message || '닉네임 변경 중 오류가 발생했습니다.')
      ToastService.error('닉네임 변경 실패했습니다.')
    }
  }

  const handleCheckNickname = async (nickname) => {
    try {
      const response = await getJoinCheckNickname(nickname)
      return response
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error)
      throw error
    }
  }

  const handleMembershipDelete = async (navigate, PW) => {
    try {
      const response = await deleteMember(PW)
      if (response.data && response.data.message === 'success') {
        logout()
        ToastService.success('회원 탈퇴가 완료되었습니다.')
        navigate(ROUTER_PATHS.HOME)
      } else {
        ToastService.info('회원 탈퇴에 실패했습니다.')
      }
    } catch (error) {
      console.error('회원 탈퇴 오류:', error)
      ToastService.error(error.message || '회원 탈퇴 중 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    handleMyData()
  }, [])

  const userLogout = () => {
    logout()
    ToastService.info('로그아웃 되었습니다.')
  }

  if (!userData) {
    return (
      <div className='flex items-center justify-center h-auto'>
        <Spinner />
      </div>
    )
  }
  const isSocialLogin =
    userData.data.loginId.includes('naver') || userData.data.loginId.includes('kakao')

  const openMembershipDeleteModal = () => {
    if (isSocialLogin) {
      openModal({
        title: '회원탈퇴',
        description: '소셜 로그인 탈퇴는 관리자에게 문의해 주세요.',
        buttonLabel: '탈퇴 문의하기',
        onButtonClick: () => {
          window.open(HELP_DESK_URL, '_blank', 'noopener,noreferrer')
        },
      })
    } else {
      setAlertState({
        isOpen: true,
        onButtonClick: null,
      })
    }
  }
  const pwChangButton = isSocialLogin
    ? 'font-bold text-dark-gray px-3 py-1'
    : 'font-bold text-main-pink px-3 py-1 rounded-[5px] hover:bg-main-pink/10 transition'

  return (
    <div>
      {isMobile ? null : <PageTitle title={'내 정보'} />}
      <div className='flex justify-center'>
        <div className='w-[580px]'>
          <div className='flex flex-col w-full gap-10 sm:gap-14 '>
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
            <div className='flex justify-between py-1 text-lg border-dark-gray'>
              <span className='text-[22px] font-semibold'>비밀번호</span>
              <button
                className={pwChangButton}
                onClick={() => navigate(ROUTER_PATHS.MY_EDIT_PW)}
                disabled={isSocialLogin}
              >
                변경
              </button>
            </div>
            <div className='flex justify-between gap-4'>
              <Button
                size='medium'
                label='회원탈퇴'
                onClick={() => {
                  openMembershipDeleteModal()
                }}
                className={'hover:bg-main-pink transition'}
                disabled={isSocialLogin}
              />
              <Button
                size='medium'
                label='로그아웃'
                onClick={() => {
                  userLogout()
                }}
                className={'hover:bg-main-pink transition'}
              />
            </div>
          </div>
        </div>
      </div>
      <MembershipPwCheck
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        onButtonClick={alertState.onButtonClick}
        onSuccessAction={handleMembershipDelete}
      />
    </div>
  )
}

export default EditProfile

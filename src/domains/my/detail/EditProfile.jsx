import PageTitle from '../../Find/common/components/PageTitle'
import Button from './../../../components/web/Button'

const EditProfile = () => {
  return (
    <div>
      <PageTitle title={'내 정보'} />
      <div>
        <div>닉네임</div>
        <div>닉네임</div>
      </div>
      <Button size='semiMedium' label='회원탈퇴' />
      <Button size='semiMedium' label='로그아웃' />
    </div>
  )
}

export default EditProfile

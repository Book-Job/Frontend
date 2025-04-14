import PageTitle from '../../Find/common/components/PageTitle'
import Button from './../../../components/web/Button'

const EditProfile = () => {

  return (
    <div>
      <div className='max-w-[580px]'>
        <PageTitle title={'내 정보'} />
        <div>
          <div className='text-[22px] font-semibold flex mb-5'>닉네임</div>
          <div className='flex justify-between py-2 text-lg border-b border-dark-gray'>
            <span>내가짱짱</span>
            <button className='font-bold text-main-pink'>수정</button>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button size='semiMedium' label='회원탈퇴' />
          <Button size='semiMedium' label='로그아웃' />
        </div>
      </div>
    </div>
  )
}

export default EditProfile

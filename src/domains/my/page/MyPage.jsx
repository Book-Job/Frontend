import MyActivity from '../mypage/components/MyActivity'
import MyData from '../mypage/components/MyData'

const MyPage = () => {
  return (
    <div>
      <MyData userID={'신나'} email={'dldmstjr@naver.com'}/>
      <MyActivity/>
    </div>
  )
}

export default MyPage

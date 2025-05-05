import { useEffect, useState } from 'react'
import MyActivity from '../mypage/components/MyActivity'
import MyData from '../mypage/components/MyData'
import { getMyData } from '../services/userMyDataServices'

const MyPage = () => {
  const [userData, setUserData] = useState()

  const handleMyData = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await getMyData(token)
      console.log('마이 데이터 확인:', response.data)
      if (response.data && response.data.message === 'success') {
        console.log('마이데이터 성공:', response.data)
        setUserData(response.data)
      } else {
        console.log('마이데이터 오류:', response.data)
      }
    } catch (error) {
      console.error('마이데이터 불러오기 오류:', error)
    }
  }
  useEffect(() => {
    handleMyData()
  }, [])
  return (
    <div>
      {userData && <MyData userID={userData.data.nickname} email={userData.data.email} />}
      <MyActivity />
    </div>
  )
}

export default MyPage

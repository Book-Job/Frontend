import { useEffect, useState } from 'react'
import MyActivity from '../mypage/components/MyActivity'
import MyData from '../mypage/components/MyData'
import { getMyData } from '../services/userMyDataServices'
import Spinner from '../../../components/web/Spinner'

const MyPage = () => {
  const [userData, setUserData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleMyData = async () => {
    try {
      const response = await getMyData()
      if (response.data && response.data.message === 'success') {
        setUserData(response.data)
      } else {
        setError('마이데이터를 불러오지 못했습니다.')
      }
    } catch (error) {
      console.error('마이데이터 불러오기 오류:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleMyData()
  }, [])

  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center mt-40'>
          <Spinner size={48} color='main-pink' />
        </div>
      ) : error ? (
        <div className='text-center text-red-500'>{error}</div>
      ) : userData ? (
        <>
          <MyData userID={userData.data.nickname} email={userData.data.email} />
          <MyActivity />
        </>
      ) : null}
    </div>
  )
}

export default MyPage

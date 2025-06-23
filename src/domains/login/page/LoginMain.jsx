import LoginForm from './../common/components/LoginForm'
import SnsLogin from './../common/components/SnsLogin'
const LoginMain = () => {
  return (
    <div className='items-center w-full h-full '>
      <LoginForm />
      <SnsLogin />
    </div>
  )
}

export default LoginMain

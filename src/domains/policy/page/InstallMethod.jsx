import iOS_install1 from '../../../assets/icons/common/ios-install1.jpg'
import iOS_install2 from '../../../assets/icons/common/ios-install2.jpg'
import iOS_install3 from '../../../assets/icons/common/ios-install3.jpg'
import iOS_install4 from '../../../assets/icons/common/ios-install4.jpg'
import android_install from '../../../assets/icons/common/android-install.png'
const InstallMethod = () => {
  return (
    <section className='flex flex-col w-full max-w-[940px] mx-auto'>
      <h1 className='mb-10 text-3xl font-bold text-left sm:text-4xl'>
        홈 화면에 바로가기 설치하기
      </h1>
      <div className='space-y-10 text-base sm:text-[17px] leading-relaxed text-left'>
        <div>
          <p>홈 화면에 바로가기를 설치하면 앱처럼 편안하게 사용할수 있습니다.</p>
        </div>

        <div>
          <h2 className='pl-3 mb-2 text-xl font-semibold border-l-4 border-main-pink'>
            1. iOS에서 홈화면에 바로가기 설치 방법
          </h2>
          <ul className='pl-6 mt-2 mb-10 space-y-1 list-disc'>
            <li className='break-words'>
              크롬에서 상단 우측에 공유 아이콘(사각형에 위로 향하는 화살표)을 탭하여 공유 메뉴를
              열도록 합니다.
            </li>
          </ul>
          <ol className='flex flex-row flex-wrap gap-10 pl-6 list-decimal list-outside'>
            <li>
              <img
                src={iOS_install2}
                alt='iOS 설치 가이드 첫 번째 단계'
                className='w-[300px] h-[600px] object-contain'
              />
            </li>
            <li>
              <img
                src={iOS_install3}
                alt='iOS 설치 가이드 두 번째 단계'
                className='w-[300px] h-[600px]'
              />
            </li>
          </ol>
          <ul className='pl-6 mt-10 mb-10 space-y-1 list-disc'>
            <li className='break-words'>
              사파리에서 하단 중앙에 있는 공유 아이콘(사각형에 위로 향하는 화살표)을 탭하여 공유
              메뉴를 열도록 합니다.
            </li>
          </ul>
          <ol className='flex flex-row flex-wrap gap-10 pl-6 list-decimal list-outside'>
            <li>
              <img
                src={iOS_install4}
                alt='iOS 설치 가이드 세 번째 단계'
                className='w-[300px] h-[600px] object-contain'
              />
            </li>
            <li>
              <img
                src={iOS_install1}
                alt='iOS 설치 가이드 네 번째 단계'
                className='w-[300px] h-[600px] object-contain'
              />
            </li>
          </ol>
        </div>

        <div>
          <h2 className='pl-3 mb-2 text-xl font-semibold border-l-4 border-main-pink'>
            2. 안드로이드에서 홈화면에 바로가기 설치 방법
          </h2>
          <ul className='pl-6 mt-2 space-y-1 list-disc'>
            <li className='break-words whitespace-normal'>
              화면 하단 알림 버튼을 눌러 홈 화면에 추가합니다.
            </li>
          </ul>
          <ol className='flex flex-row pl-6 mt-10 list-decimal list-outside'>
            <li>
              <img
                src={android_install}
                alt='안드로이드 설치 가이드'
                className='w-[300px] h-[600px] object-contain'
              />
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}

export default InstallMethod

import React from 'react'

const PrivacyPolicy = () => {
  return (
    <section className='flex flex-col w-full max-w-[940px] mx-auto'>
      <h1 className='text-3xl sm:text-4xl font-bold mb-10 text-left'>개인정보처리방침</h1>

      <div className='space-y-10 text-base sm:text-[17px] leading-relaxed text-left'>
        <div>
          <p>
            북잡(BookJob)은 이용자의 개인정보 보호를 매우 중요하게 생각하며, 「개인정보 보호법」을
            준수합니다. 본 개인정보처리방침은 북잡이 제공하는 서비스 이용 시 수집하는 개인정보, 수집
            목적 및 이용, 보관 기간 등을 안내합니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            1. 수집하는 개인정보 항목
          </h2>
          <p>회사는 다음의 개인정보를 수집할 수 있습니다:</p>
          <ul className='list-disc pl-6 space-y-1 mt-2'>
            <li>소셜 로그인 시 제공되는 식별자 정보 (이메일, 이름, 프로필 이미지 등)</li>
            <li>커뮤니티 활동 시 작성한 게시글, 댓글 등의 내용</li>
            <li>서비스 이용 기록, 접속 로그, 쿠키, IP 주소</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            2. 개인정보 수집 방법
          </h2>
          <p>
            회사는 이용자가 네이버 또는 카카오 소셜 로그인을 통해 서비스를 이용할 때 개인정보를
            수집하며, 서비스 이용 중 자발적으로 입력한 정보 또한 수집됩니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            3. 개인정보 이용 목적
          </h2>
          <ul className='list-disc pl-6 space-y-1'>
            <li>회원 식별 및 서비스 이용을 위한 인증</li>
            <li>게시글/댓글 작성 등 커뮤니티 기능 제공</li>
            <li>서비스 개선, 오류 분석 및 고객 응대</li>
            <li>법령에 따른 의무 이행</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            4. 개인정보 보유 및 이용기간
          </h2>
          <p>
            회원 탈퇴 시 수집된 개인정보는 지체 없이 파기합니다. 단, 관련 법령에 따라 일정 기간
            보존이 필요한 경우 해당 기간 동안 보관 후 파기합니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            5. 개인정보 제3자 제공
          </h2>
          <p>
            회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법령에 따라 요청이
            있는 경우에만 예외적으로 제공될 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            6. 개인정보 처리 위탁
          </h2>
          <p>
            회사는 원활한 서비스 제공을 위해 일부 업무를 외부에 위탁할 수 있으며, 위탁 시 개인정보가
            안전하게 처리되도록 관리합니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            7. 이용자의 권리와 행사 방법
          </h2>
          <ul className='list-disc pl-6 space-y-1'>
            <li>이용자는 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수 있습니다.</li>
            <li>탈퇴 후에도 게시글/댓글 등 콘텐츠는 삭제되지 않으며, 사전 삭제가 필요합니다.</li>
            <li>요청은 이메일을 통해 접수받으며, 지체 없이 조치합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            8. 쿠키(Cookie)의 사용
          </h2>
          <p>
            북잡은 서비스 품질 향상과 분석을 위해 쿠키를 사용할 수 있습니다. 사용자는 브라우저
            설정을 통해 쿠키 저장을 거부할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            9. 개인정보 보호 책임자
          </h2>
          <p>
            개인정보 관련 문의사항은 아래 이메일로 문의해 주시기 바랍니다. 회사는 신속하고 성실하게
            답변하겠습니다.
          </p>
          <p className='mt-2'>• 이메일: bookjob.help@gmail.com</p>
        </div>

        <p className='text-sm text-gray-500 pt-6 border-t mt-10'>
          본 개인정보처리방침은 2025년 7월 3일부터 시행됩니다.
        </p>
      </div>
    </section>
  )
}

export default PrivacyPolicy

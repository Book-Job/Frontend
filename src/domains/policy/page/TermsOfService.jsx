import React from 'react'

const TermsOfService = () => {
  return (
    <section className='flex flex-col w-full max-w-[940px] mx-auto'>
      <h1 className='text-3xl sm:text-4xl font-bold mb-10 text-left'>북잡 이용약관</h1>

      <div className='space-y-10 text-base sm:text-[17px] leading-relaxed text-left'>
        <div>
          <p>
            본 약관은 북잡(BookJob) 웹사이트(이하 "회사" 또는 "북잡")가 제공하는 모든 서비스의
            이용과 관련하여 회원과 회사 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제1조 (목적)
          </h2>
          <p>
            이 약관은 회사가 제공하는 온라인 구인·구직 서비스 및 커뮤니티 기능 이용에 대한 조건과
            절차, 이용자와 회사의 권리·의무를 규정합니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제2조 (정의)
          </h2>
          <ul className='list-disc pl-6 space-y-1'>
            <li>
              “서비스”란 북잡 웹사이트 및 모바일 웹 등 회사가 제공하는 기능 일체를 의미합니다.
            </li>
            <li>“회원”이란 회사와 이용계약을 체결하고 서비스를 이용하는 자를 말합니다.</li>
            <li>“게시물”이란 회원이 서비스에 작성·등록한 글, 댓글, 이미지 등을 말합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제3조 (약관의 효력 및 변경)
          </h2>
          <p>
            이 약관은 서비스 화면에 게시하거나 기타 방법으로 공지함으로써 효력이 발생하며, 회사는
            관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제4조 (회원가입)
          </h2>
          <p>
            회원은 네이버 또는 카카오 소셜 로그인을 통해 가입할 수 있으며, 회사는 허위 정보 또는
            부정 사용이 확인될 경우 가입을 제한할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제5조 (회원의 의무)
          </h2>
          <ul className='list-disc pl-6 space-y-1'>
            <li>타인의 정보를 도용하거나 허위 정보를 입력해서는 안 됩니다.</li>
            <li>타인을 비방하거나 명예를 훼손하는 게시물을 작성해서는 안 됩니다.</li>
            <li>서비스를 상업적 목적으로 이용하거나 광고성 정보를 무단 게시해서는 안 됩니다.</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제6조 (서비스의 제공 및 변경)
          </h2>
          <p>
            회사는 서비스의 전부 또는 일부를 변경하거나 중단할 수 있으며, 이에 대해 별도의 보상을
            하지 않습니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제7조 (게시물의 관리)
          </h2>
          <p>
            회원이 작성한 게시물의 책임은 작성자에게 있으며, 회사는 다음과 같은 경우 게시물을
            삭제하거나 숨길 수 있습니다:
          </p>
          <ul className='list-disc pl-6 space-y-1 mt-2'>
            <li>불법적이거나 타인의 권리를 침해하는 경우</li>
            <li>욕설, 음란물, 혐오 표현이 포함된 경우</li>
            <li>도배, 광고, 홍보성 게시물인 경우</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제8조 (구인·구직 관련 면책)
          </h2>
          <p>
            북잡은 구인·구직 게시물의 진위 여부를 보증하지 않으며, 회원 간 거래 또는 채용 관련
            분쟁에 개입하지 않습니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제9조 (계정 탈퇴 및 삭제)
          </h2>
          <p>
            회원은 언제든지 서비스 내에서 탈퇴할 수 있으며, 탈퇴 시 계정 정보는 삭제됩니다. 단,
            게시물은 삭제되지 않으며 원할 경우 탈퇴 전 삭제해야 합니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제10조 (면책조항)
          </h2>
          <p>
            회사는 천재지변, 시스템 장애 등 불가항력적인 사유로 인해 발생한 손해에 대해 책임을 지지
            않습니다.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 border-l-4 border-main-pink pl-3'>
            제11조 (관할법원 및 준거법)
          </h2>
          <p>
            이 약관은 대한민국 법령에 따라 해석되며, 분쟁 발생 시 회사 소재지의 관할 법원을 제1심
            전속관할 법원으로 합니다.
          </p>
        </div>

        <p className='text-sm text-dark-gray pt-6 border-t mt-10'>
          부칙: 본 약관은 2025년 7월 3일부터 시행합니다.
        </p>
      </div>
    </section>
  )
}

export default TermsOfService

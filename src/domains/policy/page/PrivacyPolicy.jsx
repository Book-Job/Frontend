const PrivacyPolicy = () => {
  return (
    <section className='flex flex-col w-full max-w-[940px] mx-auto'>
      <h1 className='mb-10 text-3xl font-bold text-left sm:text-4xl'>개인정보처리방침</h1>

      <div className='space-y-10 text-base sm:text-[17px] leading-relaxed text-left'>
        <div>
          <p>
            북잡(BookJob)은 이용자의 개인정보 보호를 매우 중요하게 생각하며, 「개인정보 보호법」을
            준수합니다. 본 개인정보처리방침은 북잡이 제공하는 서비스 이용 시 수집하는 개인정보, 수집
            목적 및 이용, 보관 기간 등을 안내합니다.
          </p>
        </div>

        <div>
          <h2 className='pl-3 mb-2 text-xl font-semibold border-l-4 border-main-pink'>
            1. 수집하는 개인정보 항목
          </h2>
          <p>회사는 다음의 개인정보를 수집할 수 있습니다:</p>
          <ul className='pl-6 mt-2 space-y-1 list-disc'>
            <li>소셜 로그인 시 제공되는 식별자 정보 (이메일, 이름, 프로필 이미지 등)</li>
            <li>커뮤니티 활동 시 작성한 게시글, 댓글 등의 내용</li>
            <li>서비스 이용 기록, 접속 로그, 쿠키, IP 주소</li>
          </ul>
        </div>

        <div>
          <h2 className='pl-3 mb-2 text-xl font-semibold border-l-4 border-main-pink'>
            2. 개인정보 수집 방법
          </h2>
          <p>
            회사는 이용자가 네이버 또는 카카오 소셜 로그인을 통해 서비스를 이용할 때 개인정보를
            수집하며, 서비스 이용 중 자발적으로 입력한 정보 또한 수집됩니다.
          </p>
        </div>

        <div>
          <h2 className='pl-3 mb-2 text-xl font-semibold border-l-4 border-main-pink'>
            3. 개인정보 이용 목적
          </h2>
          <ul className='pl-6 space-y-1 list-disc'>
            <li>회원 식별 및 서비스 이용을 위한 인증</li>
            <li>게시글/댓글 작성 등 커뮤니티 기능 제공</li>
            <li>서비스 개선, 오류 분석 및 고객 응대</li>
            <li>법령에 따른 의무 이행</li>
          </ul>
        </div>

        <div>
          <h2 className='pl-3 mb-2 text-xl font-semibold border-l-4 border-main-pink'>
            4. 개인정보 보유 및 이용기간
          </h2>
          <p>회원 탈퇴 시 수집된 개인정보는 1개월의 유예기간 확보 후 파기합니다.</p>
        </div>

        <div>
          <h2 className='pl-3 mb-2 text-xl font-semibold border-l-4 border-main-pink'>
            5. 개인정보 제3자 제공
          </h2>
          <p>
            회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법령에 따라 요청이
            있는 경우에만 예외적으로 제공될 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className='pl-3 mb-2 text-xl font-semibold border-l-4 border-main-pink'>
            6. 쿠키(Cookie)의 사용
          </h2>
          <p>
            북잡은 서비스 품질 향상과 분석을 위해 쿠키를 사용할 수 있습니다. 사용자는 브라우저
            설정을 통해 쿠키 저장을 거부할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className='pl-3 mb-2 text-xl font-semibold border-l-4 border-main-pink'>
            7. 개인정보 보호 책임자
          </h2>
          <p>개인정보 관련 문의사항은 아래 이메일로 문의해 주시기 바랍니다.</p>
          <p className='mt-10 text-main-pink font-bold'> · 이메일: bookjob.help@gmail.com</p>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy

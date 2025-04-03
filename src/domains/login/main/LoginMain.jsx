import InputBox from "../../../components/web/InputBox";

const LoginMain = () => {
  return (
    <div className="flex items-center">
      <div className="flex text-4xl font-bold">로그인</div>
      <div className="flex"><InputBox placeholder="이름을 입력하세요"  width={532}/></div>
    </div>
  );
};

export default LoginMain;
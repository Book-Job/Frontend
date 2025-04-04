import React from 'react';
import LabelWithInput from '../../../../components/web/LabelWithInput';
import Button from '../../../../components/web/Button';

const JoinForm = () => {
  return (
    <div>
      <h1 className='flex text-[38px] font-bold'>회원정보 입력</h1>
      <LabelWithInput label='아이디' placeholder='영문,숫자만 사용이 가능합니다. 최소4~12자까지' />
      <Button size='small' label='회원가입' bgColor= 'light-gray'  />
    </div>
  );
};

export default JoinForm;
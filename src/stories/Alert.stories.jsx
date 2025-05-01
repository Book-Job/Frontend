import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router-dom'
import Alert from '../components/web/Alert'

export default {
  title: 'Components/web/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    isOpen: true,
    onClose: action('onClose'),
    title: '알림',
    description: '기본 알림 메시지입니다.',
    buttonLabel: '확인',
    onButtonClick: action('onButtonClick'),
  },
}

const Template = (args) => <Alert {...args} />

// 로그인 성공 시나리오
export const LoginSuccess = Template.bind({})
LoginSuccess.args = {
  isOpen: true,
  onClose: action('onClose'),
  title: '로그인 성공',
  description: '홈페이지로 이동합니다.',
  buttonLabel: '홈으로',
  onButtonClick: action('navigateToHome'),
}

// 로그인 실패 시나리오
export const LoginFailure = Template.bind({})
LoginFailure.args = {
  isOpen: true,
  onClose: action('onClose'),
  title: '로그인 실패',
  description: '아이디 또는 비밀번호를 확인해주세요.',
  buttonLabel: '확인',
  onButtonClick: action('closeModal'),
}

// 모달 닫힌 상태
export const Closed = Template.bind({})
Closed.args = {
  isOpen: false,
  onClose: action('onClose'),
  title: '알림',
  description: '기본 알림 메시지입니다.',
  buttonLabel: '확인',
  onButtonClick: action('onButtonClick'),
}

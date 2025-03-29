import LabelWithInput from '../components/web/LabelWithInput'

export default {
  title: 'Components/web/LabelWithInput',
  component: LabelWithInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
}

const Template = (args) => <LabelWithInput {...args} />

export const Default = Template.bind({})
Default.args = {
  label: '아이디',
  placeholder: '이메일로 전송된 인증코드를 입력해주세요',
}

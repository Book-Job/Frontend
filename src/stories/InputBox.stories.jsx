import InputBox from '../components/web/InputBox'

export default {
  title: 'Components/web/InputBox',
  component: InputBox,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: { control: '이메일로 전송된 임시비밀번호를 입력해주세요' },
    width: { control: 'number' },
  },
}

const Template = (args) => <InputBox {...args} />

export const Default = Template.bind({});
import InputBox from '../components/web/InputBox'

export default {
  title: 'Components/web/InputBox',
  component: InputBox,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: '이메일로 전송된 임시비밀번호를 입력해주세요 ',
    size: 'medium',
  },
}

const Template = (args) => <InputBox {...args} />

export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

import PwInputBox from '../components/web/PwInputBox';

export default {
  title: 'Components/web/PwInputBox',
  component: PwInputBox,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: '임시비밀번호를 입력해주세요',
    width: 580,
  },
}

const Template = (args) => <PwInputBox {...args} />

export const Default = Template.bind({});
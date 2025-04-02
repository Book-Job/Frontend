import MobileInput from '../components/app/MobileInput'

export default {
  title: 'Components/app/MobileInputBox',
  component: MobileInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: '아이디 ',
    size: 'medium',
  },
}
const Template = (args) => <MobileInput {...args} />

export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

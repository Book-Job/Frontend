import MediumButton from '../components/web/MediumButton'

export default {
  title: 'components/web/MediumButton',
  component: MediumButton,
  args: {
    label: '비밀번호 찾기',
  },
}

export const Default = (args) => <MediumButton {...args} />

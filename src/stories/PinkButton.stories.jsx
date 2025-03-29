import PinkButton from '../components/web/PinkButton'

export default {
  title: 'components/web/PinkButton',
  component: PinkButton,
  args: {
    label: '로그인',
  },
}

export const Default = (args) => <PinkButton {...args} />

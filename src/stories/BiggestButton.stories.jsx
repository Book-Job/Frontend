import BiggestButton from '../components/web/BiggestButton'

export default {
  title: 'components/web/BiggestButton',
  component: BiggestButton,
  args: {
    label: '인증하기',
  },
}
export const Default = (args) => <BiggestButton {...args} />

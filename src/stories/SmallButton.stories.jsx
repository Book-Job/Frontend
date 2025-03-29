import SmallButton from '../components/web/SmallButton'

export default {
  title: 'components/web/SmallButton',
  component: SmallButton,
  args: {
    label: '인증',
  },
}

export const Default = (args) => <SmallButton {...args} />

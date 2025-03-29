import BigButton from '../components/web/BigButton'

export default {
  title: 'components/web/BigButton',
  component: BigButton,
  args: {
    label: '로그인',
    bgColor: '#D9D9D9',
  },
  argTypes: {
    bgColor: {
      control: {
        type: 'color',
      },
    },
  },
}

export const Default = (args) => <BigButton {...args} />

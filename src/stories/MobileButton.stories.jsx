import MobileButton from '../components/app/MobileButton'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/app/MobileButton',
  component: MobileButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: action('클릭액션'),
    size: {
      control: 'select',
      options: ['small', 'big'],
    },
    bgColor: {
      control: 'color',
    },
    label: { control: 'text' },
  },
}

const Template = (args) => <MobileButton {...args} />

export const Small = Template.bind({})
Small.args = {
  label: '작은 버튼',
  size: 'small',
  bgColor: 'gray-d9d9d9',
  onClick: action('클릭액션'),
}

export const Big = Template.bind({})
Big.args = {
  label: '큰 버튼',
  size: 'big',
  bgColor: 'gray-d9d9d9',
  onClick: action('클릭액션'),
}

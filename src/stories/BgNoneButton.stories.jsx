import { action } from '@storybook/addon-actions'
import BgNoneButton from '../components/web/BgNoneButton'

export default {
  title: 'Components/web/Button',
  component: BgNoneButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'big', 'biggest'],
    },
    bgColor: {
      control: 'color',
    },
    label: { control: 'text' },
  },
}

const Template = (args) => <BgNoneButton {...args} />

export const Small = Template.bind({})
Small.args = {
  label: '작은 버튼',
  size: 'small',
  textColor: '#000000',
  onClick: action('클릭액션'),
}

export const Default = Template.bind({})
Default.args = {
  label: '기본 버튼',
  size: 'medium',
  textColor: 'main-pink',
  onClick: action('클릭액션'),
}

export const Big = Template.bind({})
Big.args = {
  label: '큰 버튼',
  size: 'big',
  textColor: 'hover-pink',
  onClick: action('클릭액션'),
}

export const Biggest = Template.bind({})
Biggest.args = {
  label: '가장 큰 버튼',
  size: 'biggest',
  textColor: '#4964ff',
  onClick: action('클릭액션'),
}

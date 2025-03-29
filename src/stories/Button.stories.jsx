import React from 'react'
import Button from '../components/web/Button'

export default {
  title: 'Components/web/Button',
  component: Button,
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

const Template = (args) => <Button {...args} />

export const Small = Template.bind({})
Small.args = {
  label: '작은 버튼',
  size: 'small',
  bgColor: '#d9d9d9',
}

//default = 미디움 사이즈
export const Default = Template.bind({})
Default.args = {
  label: '기본 버튼',
  size: 'medium',
  bgColor: '#d9d9d9',
}

export const Big = Template.bind({})
Big.args = {
  label: '큰 버튼',
  size: 'big',
  bgColor: '#d9d9d9',
}

export const Biggest = Template.bind({})
Biggest.args = {
  label: '가장 큰 버튼',
  size: 'biggest',
  bgColor: '#d9d9d9',
}

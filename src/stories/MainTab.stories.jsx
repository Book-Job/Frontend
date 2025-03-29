import React, { useState } from 'react'
import MainTab from '../components/web/MainTab'

export default {
  title: 'Components/web/MainTab',
  component: MainTab,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    bgColor: { control: 'color' },
    isSelected: { control: 'boolean' },
    onClick: {
      action: 'onClick',
    },
  },
}

export const Default = (args) => {
  const [selected, setSelected] = useState(false)

  const handleClick = (label) => {
    setSelected((prevSelected) => !prevSelected)
  }

  return <MainTab {...args} isSelected={selected} onClick={handleClick} />
}

export const Active = () => (
  <MainTab
    label='구인/구직'
    isSelected={true}
    bgColor='#E36397'
    onClick={(label) => console.log(`Clicked on: ${label}`)}
  />
)
export const Inactive = () => (
  <MainTab
    label='자유'
    isSelected={false}
    bgColor='#D9d9d9'
    onClick={(label) => console.log(`Clicked on: ${label}`)}
  />
)

import { useState } from 'react'
import SearchBar from '../components/web/SearchBar'

export default {
  title: 'components/web/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    onSearch: { action: 'searched' },
  },
}

const Template = (args) => {
  const [value, setValue] = useState('')

  const handleSearch = (searchTerm) => {
    console.log('Search for:', searchTerm)
    args.onSearch(searchTerm)
  }

  return (
    <SearchBar
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={handleSearch}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  placeholder: '검색어를 입력하세요.',
}

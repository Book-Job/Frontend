import { useState } from 'react'
import SearchBar from '../components/web/SearchBar'

export default {
  title: 'components/web/SearchBar',
  component: SearchBar,
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    onSearch: { action: 'searched' }, // onSearch 액션 추가
  },
}

const Template = (args) => {
  const [value, setValue] = useState('')

  const handleSearch = (searchTerm) => {
    console.log('Search for:', searchTerm) // 엔터 키를 눌렀을 때 검색어 출력
    args.onSearch(searchTerm) // Storybook action을 호출
  }

  return (
    <SearchBar
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)} // 입력 필드에서 텍스트가 바뀔 때마다 상태를 업데이트
      onSearch={handleSearch}    // 엔터 키를 눌렀을 때 검색어를 전달
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  placeholder: '검색어를 입력하세요.',
}

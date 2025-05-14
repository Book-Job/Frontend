export const jobCategories = [
  { value: 'EDITOR', label: '에디터' },
  { value: 'DESIGNER', label: '디자이너' },
  { value: 'MARKETER', label: '마케터' },
  { value: 'ILLUSTRATOR', label: '일러스트레이터' },
  { value: 'SUPPORT', label: '서포트' },
  { value: 'ETC', label: '기타' },
]
export function getJobCategoryLabel(value) {
  const found = jobCategories.find((item) => item.value === value)
  return found ? found.label : value
}

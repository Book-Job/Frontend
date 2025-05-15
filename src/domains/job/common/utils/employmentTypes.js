export const employmentTypes = [
  { value: 'FULL_TIME', label: '정규직' },
  { value: 'TEMPORARY', label: '계약직' },
  { value: 'FREELANCE', label: '프리랜서' },
  { value: 'INTERN', label: '인턴' },
]

export function getEmploymentTypeLabel(value) {
  const found = employmentTypes.find((item) => item.value === value)
  return found ? found.label : value
}

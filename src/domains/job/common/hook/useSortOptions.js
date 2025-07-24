export default function useSortOptions() {
  const recruitmentSortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' },
    { value: 'closing_soon', label: '마감임박순' },
  ]

  const seekingSortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'editor', label: '에디터' },
    { value: 'designer', label: '디자이너' },
    { value: 'marketer', label: '마케터' },
    { value: 'illustrator', label: '일러스트' },
    { value: 'support', label: '서포트' },
    { value: 'etc', label: '기타' },
  ]

  return { recruitmentSortOptions, seekingSortOptions }
}

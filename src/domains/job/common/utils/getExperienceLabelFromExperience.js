export function getExperienceLabelFromExperience(exp) {
  if (exp === '0' || exp === 0 || exp === '신입') return '신입'
  if (!exp) return '경력무관'
  return `${exp}년`
}

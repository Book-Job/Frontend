function getExperienceLabel(min, max) {
  if ((min === 0 || min == null) && (max === 0 || max == null)) {
    return '경력무관'
  }
  if (min === max) {
    return `${min}년`
  }
  if (min != null && max != null) {
    return `${min}~${max}년`
  }
  if (min != null) {
    return `${min}년 이상`
  }
  if (max != null) {
    return `${max}년 이하`
  }
  return '신입'
}

export default getExperienceLabel

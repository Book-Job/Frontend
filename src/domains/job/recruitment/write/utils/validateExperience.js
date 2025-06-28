export const validateExperience = (minExp, maxExp) => {
  if (minExp === undefined || maxExp === undefined) return { valid: true }
  if (minExp > maxExp) {
    return {
      valid: false,
      message: '최소 경력은 최대 경력보다 같거나 작아야 합니다.',
    }
  }
  return { valid: true }
}

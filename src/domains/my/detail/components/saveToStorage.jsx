import DOMPurify from 'dompurify'

const saveTOStorage = (postData, id, draftType) => {
  const recentList = JSON.parse(sessionStorage.getItem('RecentListSave')) || []

  const newItem = {
    id,
    title: postData.title || '제목 없음',
    text: postData.text
      ? DOMPurify.sanitize(postData.text, { ALLOWED_TAGS: [] }).slice(0, 30)
      : '내용 없음',
    draftType: draftType || 'community',
    date: new Date().toISOString(),
    ...(postData.viewCount && { viewCount: postData.viewCount }),
    ...(postData.createdAt && { createdAt: postData.createdAt }),
    ...(postData.commentCount && { commentCount: postData.commentCount }),
    ...(postData.nickname && { nickname: postData.nickname }),
    ...(postData.isAuthentic && { isAuthentic: postData.isAuthentic }),
    ...(postData.employmentType && { employmentType: postData.employmentType }),
    ...(postData.experience && { experience: postData.experience }),
    ...(postData.jobCategory && { jobCategory: postData.jobCategory }),
    ...(postData.experienceMin && { experienceMin: postData.experienceMin }),
    ...(postData.experienceMax && { experienceMax: postData.experienceMax }),
    ...(postData.location && { location: postData.location }),
    ...(postData.closingDate && { closingDate: postData.closingDate }),
    ...(postData.websiteUrl && { websiteUrl: postData.websiteUrl }),
    ...(postData.contactEmail && { contactEmail: postData.contactEmail }),
  }

  const updatedList = [newItem, ...recentList.filter((item) => item.id !== id)].slice(0, 30)

  try {
    sessionStorage.setItem('RecentListSave', JSON.stringify(updatedList))
  } catch (e) {
    console.error('스토리지 저장 실패:', e)
  }
}

export { saveTOStorage }

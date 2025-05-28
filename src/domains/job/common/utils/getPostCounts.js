export function getPostCounts(posts) {
<<<<<<< HEAD
  const today = new Date().toISOString().slice(0, 10)
  const total = posts.length
  const todayCount = posts.filter(
    (post) => post.createdAt && post.createdAt.slice(0, 10) === today,
  ).length
  return { total, today: todayCount }
=======
  if (!Array.isArray(posts)) return { total: 0, today: 0 }
  const todayStr = new Date().toISOString().slice(0, 10)
  let today = 0
  for (const post of posts) {
    const dateStr = (post.createdAt || '').slice(0, 10)
    if (dateStr === todayStr) today += 1
  }
  return { total: posts.length, today }
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
}

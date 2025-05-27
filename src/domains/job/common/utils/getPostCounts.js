export function getPostCounts(posts) {
  if (!Array.isArray(posts)) return { total: 0, today: 0 }
  const todayStr = new Date().toISOString().slice(0, 10)
  let today = 0
  for (const post of posts) {
    const dateStr = (post.createdAt || '').slice(0, 10)
    if (dateStr === todayStr) today += 1
  }
  return { total: posts.length, today }
}

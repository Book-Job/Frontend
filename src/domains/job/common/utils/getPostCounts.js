export function getPostCounts(posts) {
  const today = new Date().toISOString().slice(0, 10)
  const total = posts.length
  const todayCount = posts.filter(
    (post) => post.createdAt && post.createdAt.slice(0, 10) === today,
  ).length
  return { total, today: todayCount }
}

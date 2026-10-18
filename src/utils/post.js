export function plainText(html = '') {
  const document = new DOMParser().parseFromString(html, 'text/html')
  document.querySelectorAll('p, div, h1, h2, h3, h4, li, br').forEach((element) => element.after(' '))
  return document.body.textContent.replace(/\s+/g, ' ').trim()
}
export function readingTime(content) {
  return Math.max(1, Math.ceil(plainText(content).split(/\s+/).filter(Boolean).length / 200))
}
export function formatDate(value) {
  if (!value) return 'Fresh from the nest'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Fresh from the nest' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

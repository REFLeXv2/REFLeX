export function parseDemoId(pathname: string): number | null {
  const m = pathname.match(/^\/demo\/(\d{1,2})\/?$/i)
  if (!m) return null
  const id = parseInt(m[1], 10)
  return id >= 1 && id <= 23 ? id : null
}

export function demoPath(id: number) {
  return `/demo/${String(id).padStart(2, '0')}`
}

export function navigate(to: string) {
  if (window.location.pathname === to) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

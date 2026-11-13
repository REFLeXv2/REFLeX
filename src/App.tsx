import { useEffect, useState } from 'react'
import { parseDemoId } from './router'
import { PortfolioHome } from './PortfolioHome'
import { ProjectDemoPage } from './components/ProjectDemoPage'

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const demoId = parseDemoId(path)
  useEffect(() => {
    if (demoId) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [demoId])

  if (demoId) return <ProjectDemoPage projectId={demoId} />
  return <PortfolioHome />
}

export { matchesLanguage } from './PortfolioHome'

export type Lang = 'ar' | 'en' | 'tr'
export type Theme = 'light' | 'dark'

export type CategoryId =
  | 'desktop-systems'
  | 'security-dashboards'
  | 'automation-data'
  | 'web-portals'
  | 'cli-tooling'

export interface LocalizedText {
  ar: string
  en: string
  tr: string
}

export interface LocalizedList {
  ar: string[]
  en: string[]
  tr: string[]
}

export interface KeyFeature {
  title: string
  explanation: string
}

export interface ProjectCaseStudy {
  id: number
  index: string
  category: CategoryId
  stack: string[]
  title: string
  problemContext: string
  systemArchitecture: string
  databaseAndSecurity: string
  keyFeatures: KeyFeature[]
  operationalImpact: string
}

export type Project = ProjectCaseStudy

export interface CategoryMeta {
  id: CategoryId | 'all'
  label: LocalizedText
}

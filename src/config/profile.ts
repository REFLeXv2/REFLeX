import type { LocalizedText } from '../types'

export interface SocialLink {
  id: 'github' | 'linkedin' | 'telegram' | 'whatsapp' | 'instagram'
  label: LocalizedText
  url: string
}

export interface ProfileConfig {
  fullName: LocalizedText
  dateOfBirth: {
    value: string
    label: LocalizedText
  }
  experience: {
    years: number
    label: LocalizedText
  }
  spokenLanguages: {
    count: number
    label: LocalizedText
  }
  location: LocalizedText
  title: LocalizedText
  portfolioScale: {
    value: string
    label: LocalizedText
  }
  socials: SocialLink[]
}

export const profile: ProfileConfig = {
  fullName: {
    ar: 'عبدالرزاق نبيل ارزوقي عباس',
    en: 'Abdulrazzaq Nabeel Arzouqi Abbas',
    tr: 'Abdulrazzaq Nabeel Arzouqi Abbas',
  },
  dateOfBirth: {
    value: '2006/02/15',
    label: {
      ar: 'مواليد: 2006/02/15',
      en: 'Born: 2006/02/15',
      tr: 'Doğum Tarihi: 15.02.2006',
    },
  },
  experience: {
    years: 9,
    label: {
      ar: '9 سنوات خبرة عملية',
      en: '9 Years Practical Experience',
      tr: '9 Yıllık Uygulamalı Deneyim',
    },
  },
  spokenLanguages: {
    count: 3,
    label: {
      ar: '3 لغات (العربية • الإنكليزية • التركية)',
      en: '3 Languages (Arabic • English • Turkish)',
      tr: '3 Dil (Arapça • İngilizce • Türkçe)',
    },
  },
  location: {
    ar: 'بغداد، العراق',
    en: 'Baghdad, Iraq',
    tr: 'Bağdat, Irak',
  },
  title: {
    ar: 'مطور برمجيات وأنظمة متكاملة | مزاول مهنة',
    en: 'Full-Stack & Systems Software Developer',
    tr: 'Tam Yığın ve Sistem Yazılım Geliştiricisi',
  },
  portfolioScale: {
    value: '23',
    label: {
      ar: '23 مشروعًا إنتاجيًا',
      en: '23 Production Projects',
      tr: '23 Üretim Projesi',
    },
  },
  socials: [
    {
      id: 'telegram',
      label: { ar: 'Telegram', en: 'Telegram', tr: 'Telegram' },
      url: 'https://t.me/mmsv90',
    },
    {
      id: 'instagram',
      label: { ar: 'Instagram', en: 'Instagram', tr: 'Instagram' },
      url: 'https://www.instagram.com/2vq.8',
    },
    {
      id: 'linkedin',
      label: { ar: 'LinkedIn', en: 'LinkedIn', tr: 'LinkedIn' },
      url: 'https://www.linkedin.com/in/abdulrzaq-nabeel-3758ab374',
    },
    {
      id: 'github',
      label: { ar: 'GitHub', en: 'GitHub', tr: 'GitHub' },
      url: 'https://github.com/REFLeXv2',
    },
    {
      id: 'whatsapp',
      label: { ar: 'WhatsApp', en: 'WhatsApp', tr: 'WhatsApp' },
      url: 'https://wa.me/9647843161302',
    },
  ],
}

import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'

type RecordItem = { id: number; ar: string; en: string }

const DATA: RecordItem[] = [
  { id: 1, ar: 'عقد إيجار سكني في بغداد – منطقة الكرادة', en: 'Residential lease contract in Baghdad - Karrada' },
  { id: 2, ar: 'إقرار استلام رواتب الموظفين لشهر آذار ٢٠٢٦', en: 'Employee salary receipt acknowledgment for March 2026' },
  { id: 3, ar: 'محضر اجتماع لجنة المشتريات الحكومية', en: 'Government procurement committee meeting minutes' },
  { id: 4, ar: 'سجل حضور وانصراف – وزارة التخطيط', en: 'Attendance log - Ministry of Planning' },
  { id: 5, ar: 'طلب إجازة سنوية للموظف أحمد علي', en: 'Annual leave request for employee Ahmed Ali' },
  { id: 6, ar: 'فاتورة شراء أجهزة حاسوب ومعدات مكتبية', en: 'Invoice for computers and office equipment purchase' },
  { id: 7, ar: 'تقرير تدقيق مالي ربع سنوي', en: 'Quarterly financial audit report' },
  { id: 8, ar: 'أمر صرف مستحقات مشروع تطوير البنية التحتية', en: 'Payment order for infrastructure development project' },
  { id: 9, ar: 'وثيقة هوية موظف – بطاقة تعريفية', en: 'Employee identity document - ID card' },
  { id: 10, ar: 'مذكرة قانونية بشأن نزاع تعاقدي', en: 'Legal memo regarding contractual dispute' },
  { id: 11, ar: 'سند قبض نقدي رقم ١٢٤٥', en: 'Cash receipt voucher No. 1245' },
  { id: 12, ar: 'جدول دوام المناوبات الليلية', en: 'Night shift duty schedule' },
  { id: 13, ar: 'محضر تسليم عهدة مستودع', en: 'Warehouse custody handover record' },
  { id: 14, ar: 'كتاب رسمي إلى مديرية التسجيل العقاري', en: 'Official letter to Real Estate Registration Directorate' },
  { id: 15, ar: 'إشعار استحقاق ضريبة سنوية', en: 'Annual tax due notification' },
  { id: 16, ar: 'طلب توظيف مطور برمجيات – قسم الأنظمة', en: 'Software developer job application - Systems department' },
  { id: 17, ar: 'بيان حالة قضية في محكمة الأحوال المدنية', en: 'Case status statement in Civil Status Court' },
  { id: 18, ar: 'تعميم إداري بشأن تحديث إجراءات الأمن', en: 'Administrative circular on security procedure updates' },
  { id: 19, ar: 'سجل صيانة مولدات كهربائية', en: 'Electrical generators maintenance log' },
  { id: 20, ar: 'محضر جرد مخزني نهاية السنة', en: 'Year-end inventory stocktaking record' },
  { id: 21, ar: 'موافقة على ترقية وظيفية', en: 'Job promotion approval' },
  { id: 22, ar: 'عقد خدمات استشارية تقنية معلومات', en: 'IT consulting services contract' },
  { id: 23, ar: 'تقرير إنجاز مشروع أرشفة إلكترونية', en: 'Electronic archiving project completion report' },
  { id: 24, ar: 'إفادة دوام وتأخير الموظفين', en: 'Employee attendance and tardiness statement' },
  { id: 25, ar: 'أمر إداري بنقل موظف إلى فرع البصرة', en: 'Administrative order to transfer employee to Basra branch' },
  { id: 26, ar: 'سجل زيارات ميدانية لمواقع العمل', en: 'Field visit log to work sites' },
  { id: 27, ar: 'طلب شراء قرطاسية ومستلزمات', en: 'Stationery and supplies purchase request' },
  { id: 28, ar: 'كشف حساب بنكي شهري للمؤسسة', en: 'Monthly institutional bank statement' },
  { id: 29, ar: 'محضر تحقيق إداري داخلي', en: 'Internal administrative investigation record' },
  { id: 30, ar: 'اتفاقية تعاون بين دائرتين حكوميتين', en: 'Cooperation agreement between two government departments' },
  { id: 31, ar: 'تقرير حالة خوادم وشبكات', en: 'Servers and networks status report' },
  { id: 32, ar: 'إشعار قبول طلب منحة تدريبية', en: 'Training grant application acceptance notice' },
]

const copy = {
  ar: {
    input: 'ابحث في السجلات الإدارية والقانونية…',
    raw: 'النص الخام', stripped: 'بعد إزالة التشكيل', normalized: 'رموز موحدة للبحث',
    latency: 'زمن التنفيذ', matches: 'نتائج مطابقة', empty: 'لا توجد نتائج مطابقة.',
    demo: 'يوضح هذا العرض تطبيع النص العربي (إزالة التشكيل وتوحيد الهمزات/التاء المربوطة/الألف المقصورة) مع بحث فوري وقياس زمني فعلي.',
  },
  en: {
    input: 'Search administrative and legal records…',
    raw: 'Raw query', stripped: 'Diacritics stripped', normalized: 'Normalized tokens',
    latency: 'Execution time', matches: 'matches', empty: 'No matching records.',
    demo: 'Demonstrates Arabic text normalization (diacritics removal and unification of hamzas/ta-marbuta/alef-maqsura) with live search and real timing.',
  },
  tr: {
    input: 'İdari ve hukuki kayıtları ara…',
    raw: 'Ham sorgu', stripped: 'Harekeler kaldırıldı', normalized: 'Normalize edilmiş belirteçler',
    latency: 'Çalışma süresi', matches: 'eşleşme', empty: 'Eşleşen kayıt yok.',
    demo: 'Arapça metin normalizasyonunu (hareke kaldırma ve hamza/te-marbuta/elif-maksura birleştirme) canlı arama ve gerçek zaman ölçümüyle gösterir.',
  },
}

function stripDiacritics(s: string) {
  return s.replace(/[\u064B-\u065F\u0670\u0610-\u061A]/g, '')
}

function normalizeArabic(s: string) {
  return stripDiacritics(s)
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ـ/g, '')
    .toLowerCase()
    .trim()
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (!tokens.length) return <>{text}</>
  const pattern = tokens.filter(Boolean).map(escapeRegExp).join('|')
  if (!pattern) return <>{text}</>
  const re = new RegExp(`(${pattern})`, 'gi')
  const parts = text.split(re)
  return (
    <>
      {parts.map((part, i) =>
        re.test(part) ? (
          <mark key={i} className="rounded bg-teal-500/25 px-0.5 text-teal-900 dark:text-teal-100">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

export function ArabicSearchLab() {
  const { lang } = useApp()
  const c = copy[lang]
  const [query, setQuery] = useState('')

  const result = useMemo(() => {
    const t0 = performance.now()
    const raw = query
    const stripped = stripDiacritics(raw)
    const normalized = normalizeArabic(raw)
    const tokens = normalized.split(/\s+/).filter(Boolean)
    const matches = tokens.length
      ? DATA.filter((r) => {
          const hay = normalizeArabic(`${r.ar} ${r.en}`)
          return tokens.every((tok) => hay.includes(tok))
        })
      : DATA
    const ms = performance.now() - t0
    return { raw, stripped, normalized, tokens, matches, ms }
  }, [query])

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-600 dark:text-[var(--color-muted-dark)]">{c.demo}</p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={c.input}
        className="min-h-[42px] w-full rounded-lg border border-[#DCD6CA] bg-white/70 px-3 py-2 text-base text-stone-900 outline-none focus:border-[var(--color-accent)] dark:border-slate-700 dark:bg-slate-900/60 dark:text-[var(--color-ink-dark)] sm:text-sm"
      />

      <div className="grid gap-2 sm:grid-cols-3 text-xs">
        <div className="rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-2 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="font-semibold text-stone-700 dark:text-stone-200">{c.raw}</div>
          <div className="mt-1 break-all font-mono text-stone-600 dark:text-[var(--color-muted-dark)]">{result.raw || '—'}</div>
        </div>
        <div className="rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-2 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="font-semibold text-stone-700 dark:text-stone-200">{c.stripped}</div>
          <div className="mt-1 break-all font-mono text-stone-600 dark:text-[var(--color-muted-dark)]">{result.stripped || '—'}</div>
        </div>
        <div className="rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-2 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="font-semibold text-stone-700 dark:text-stone-200">{c.normalized}</div>
          <div className="mt-1 break-all font-mono text-teal-700 dark:text-teal-300">{result.normalized || '—'}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-stone-700 dark:text-stone-300">
        <span className="rounded-full border border-teal-600/30 bg-teal-600/10 px-2.5 py-1 text-teal-800 dark:text-teal-200">
          {c.latency}: {result.ms.toFixed(3)} ms ({(result.ms * 1000).toFixed(1)} µs)
        </span>
        <span>{result.matches.length} {c.matches}</span>
      </div>

      <div className="max-h-72 space-y-1.5 overflow-auto rounded-lg border border-[#DCD6CA] bg-white/50 p-2 dark:border-slate-800 dark:bg-slate-950/30">
        {result.matches.length === 0 ? (
          <p className="p-3 text-sm text-stone-500 dark:text-[var(--color-muted-dark)]">{c.empty}</p>
        ) : (
          result.matches.map((r) => (
            <div key={r.id} className="rounded-md border border-[#E6E1D8] bg-[#F7F5F0]/70 px-3 py-2 text-sm dark:border-slate-800/70 dark:bg-slate-900/40">
              <div className="font-medium text-stone-900 dark:text-[var(--color-ink-dark)]" dir="rtl">
                <Highlight text={r.ar} tokens={result.tokens} />
              </div>
              <div className="mt-0.5 text-xs text-stone-500 dark:text-[var(--color-muted-dark)]">
                <Highlight text={r.en} tokens={result.tokens} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

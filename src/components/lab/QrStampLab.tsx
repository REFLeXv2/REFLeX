import { useMemo, useRef, useState } from 'react'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { sha256Hex } from '../../utils/hash'
import { useApp } from '../../context/AppContext'

const copy = {
  ar: {
    demo: 'مولد ختم تحقق QR تشفيري: أدخل بيانات الوثيقة، احسب تجزئة SHA-256 حقيقية مع طابع زمني ISO، واعرض رمز QR عالي الدقة قابل للتنزيل PNG/SVG.',
    ref: 'رقم مرجع الوثيقة', entity: 'اسم الجهة / الشخص', subject: 'المبلغ أو الموضوع',
    generate: 'إنشاء ختم التحقق', hash: 'تجزئة التحقق (SHA-256)', payload: 'حمولة التحقق', downloadPng: 'تنزيل PNG', downloadSvg: 'تنزيل SVG',
    empty: 'أدخل البيانات واضغط إنشاء لعرض رمز QR وختم التحقق.',
  },
  en: {
    demo: 'Cryptographic QR verification stamp generator: enter document data, compute a real SHA-256 hash with an ISO timestamp, and render a high-DPI downloadable QR (PNG/SVG).',
    ref: 'Document Reference Number', entity: 'Entity Name', subject: 'Amount / Subject',
    generate: 'Generate Verification Stamp', hash: 'Verification hash (SHA-256)', payload: 'Verification payload', downloadPng: 'Download PNG', downloadSvg: 'Download SVG',
    empty: 'Enter data and generate to display the QR code and verification stamp.',
  },
  tr: {
    demo: 'Kriptografik QR doğrulama damgası oluşturucu: belge verilerini girin, ISO zaman damgalı gerçek SHA-256 karması hesaplayın ve yüksek DPI indirilebilir QR (PNG/SVG) oluşturun.',
    ref: 'Belge Referans Numarası', entity: 'Kurum / Kişi Adı', subject: 'Tutar / Konu',
    generate: 'Doğrulama Damgası Oluştur', hash: 'Doğrulama karması (SHA-256)', payload: 'Doğrulama yükü', downloadPng: 'PNG İndir', downloadSvg: 'SVG İndir',
    empty: 'QR kodu ve doğrulama damgasını göstermek için veri girin ve oluşturun.',
  },
}

const input = 'min-h-[42px] w-full rounded border border-[#DCD6CA] bg-white/70 px-2 py-1.5 text-base sm:text-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-[var(--color-ink-dark)]'
const btn = 'min-h-[42px] rounded-md border border-teal-600/30 bg-teal-600/10 px-3 py-1.5 text-xs font-semibold text-teal-800 transition active:scale-95 hover:bg-teal-600 hover:text-white dark:text-teal-200'

async function sha256(text: string) {
  return sha256Hex(text)
}

export function QrStampLab() {
  const { lang } = useApp()
  const c = copy[lang]
  const [refNo, setRefNo] = useState('DOC-2026-00142')
  const [entity, setEntity] = useState(lang === 'ar' ? 'وزارة التخطيط' : lang === 'tr' ? 'Planlama Bakanlığı' : 'Ministry of Planning')
  const [subject, setSubject] = useState(lang === 'ar' ? 'إيصال دفع رسوم' : lang === 'tr' ? 'Ücret ödeme makbuzu' : 'Fee payment receipt')
  const [result, setResult] = useState<{ hash: string; payload: string; ts: string } | null>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const svgWrapRef = useRef<HTMLDivElement>(null)

  const qrValue = useMemo(() => result?.payload ?? '', [result])

  const generate = async () => {
    const ts = new Date().toISOString()
    const base = { refNo, entity, subject, issuedAt: ts }
    const hash = await sha256(JSON.stringify(base))
    const payload = JSON.stringify({ ...base, alg: 'SHA-256', hash })
    setResult({ hash, payload, ts })
  }

  const downloadPng = () => {
    const canvas = canvasWrapRef.current?.querySelector('canvas') as HTMLCanvasElement | null
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `verification-stamp-${refNo || 'doc'}.png`
    a.click()
  }

  const downloadSvg = () => {
    const svg = svgWrapRef.current?.querySelector('svg') as SVGSVGElement | null
    if (!svg) return
    const data = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `verification-stamp-${refNo || 'doc'}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-600 dark:text-[var(--color-muted-dark)]">{c.demo}</p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-3 rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40">
          <label className="block text-xs">
            <span className="font-semibold text-stone-700 dark:text-stone-200">{c.ref}</span>
            <input value={refNo} onChange={(e) => setRefNo(e.target.value)} className={`${input} mt-1`} />
          </label>
          <label className="block text-xs">
            <span className="font-semibold text-stone-700 dark:text-stone-200">{c.entity}</span>
            <input value={entity} onChange={(e) => setEntity(e.target.value)} className={`${input} mt-1`} />
          </label>
          <label className="block text-xs">
            <span className="font-semibold text-stone-700 dark:text-stone-200">{c.subject}</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className={`${input} mt-1`} />
          </label>
          <button type="button" onClick={generate} className={`${btn} w-full`}>
            {c.generate}
          </button>

          {result && (
            <>
              <div className="text-xs font-semibold text-stone-700 dark:text-stone-200">{c.hash}</div>
              <div className="break-all rounded border border-teal-600/30 bg-teal-600/10 p-2 font-mono text-[11px] text-teal-800 dark:text-teal-200">{result.hash}</div>
              <div className="break-all text-[11px] text-stone-500 dark:text-[var(--color-muted-dark)]">ISO: {result.ts}</div>
            </>
          )}
        </div>

        <div className="overflow-hidden rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40">
          {!result ? (
            <p className="text-sm text-stone-500 dark:text-[var(--color-muted-dark)]">{c.empty}</p>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-center gap-4 overflow-x-auto rounded-lg bg-white p-3 sm:gap-6 sm:p-4">
                <div ref={canvasWrapRef} className="text-center">
                  <QRCodeCanvas value={qrValue} size={180} level="H" includeMargin marginSize={2} className="mx-auto h-auto w-full max-w-[180px]" />
                  <div className="mt-1 text-[10px] text-stone-500">PNG (Canvas)</div>
                </div>
                <div ref={svgWrapRef} className="text-center">
                  <QRCodeSVG value={qrValue} size={180} level="H" includeMargin marginSize={2} className="mx-auto h-auto w-full max-w-[180px]" />
                  <div className="mt-1 text-[10px] text-stone-500">SVG</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={downloadPng} className={`${btn} !bg-transparent`}>{c.downloadPng}</button>
                <button type="button" onClick={downloadSvg} className={`${btn} !bg-transparent`}>{c.downloadSvg}</button>
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold text-stone-700 dark:text-stone-200">{c.payload}</div>
                <pre className="max-h-40 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded border border-[#DCD6CA] bg-slate-950 p-2 font-mono text-[10px] text-emerald-300 dark:border-slate-800">{result.payload}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

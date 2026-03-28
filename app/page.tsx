'use client'

import { useState } from 'react'
import { saveAuditUrl } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const improvements = [
  { priority: 'critical', label: 'Core Web Vitals', desc: 'LCP > 4s — bloque l\'indexation IA', color: 'destructive' },
  { priority: 'high',     label: 'Schema.org',      desc: 'Article, FAQ, BreadcrumbList manquants', color: 'warning' },
  { priority: 'medium',   label: 'Contenu long-form', desc: 'Moins de 300 mots par page', color: 'secondary' },
  { priority: 'low',      label: 'Robots.txt GPTBot', desc: 'Autoriser l\'indexation IA', color: 'outline' },
]

const criteria = [
  { label: 'Structure sémantique', score: 92, color: 'bg-emerald-500' },
  { label: 'Contenu structuré',    score: 78, color: 'bg-emerald-500' },
  { label: 'Balisage Schema.org',  score: 45, color: 'bg-amber-500'   },
  { label: 'Vitesse chargement',   score: 31, color: 'bg-red-500'     },
  { label: 'Méta-données IA',      score: 61, color: 'bg-amber-500'   },
]

export default function HomePage() {
  const [url, setUrl]           = useState('')
  const [loading, setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const normalized = url.startsWith('http') ? url : `https://${url}`
    try { new URL(normalized) } catch { setError('URL invalide'); return }
    setLoading(true)
    try {
      await saveAuditUrl(normalized)
      setSubmitted(true)
    } catch { setError("Erreur d'envoi. Réessayez.") }
    finally  { setLoading(false) }
  }

  return (
    <main className="min-h-screen bg-[#09090b] p-4 md:p-6">

      {/* Grid Bento */}
      <div className="max-w-5xl mx-auto grid grid-cols-12 gap-3">

        {/* ── Hero / Search ── span 12 */}
        <Card className="col-span-12 bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-zinc-100">GEO Audit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                <span className="text-xs text-zinc-500">Système actif</span>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 focus-within:border-emerald-500 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/>
                  </svg>
                  <Input
                    value={url}
                    onChange={e => { setUrl(e.target.value); setError('') }}
                    placeholder="https://votre-site.fr — Analysez l'IA-compatibilité"
                    className="border-0 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-0 p-0 h-11"
                  />
                </div>
                <Button disabled={loading || !url.trim()} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold shrink-0">
                  {loading ? 'Analyse…' : 'Analyser →'}
                </Button>
              </form>
            ) : (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-200">Audit lancé pour <span className="text-emerald-400">{url}</span></p>
                  <p className="text-xs text-zinc-500 mt-0.5">Résultats disponibles sous peu</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setSubmitted(false); setUrl('') }} className="text-zinc-500 hover:text-zinc-300 text-xs">
                  Nouveau
                </Button>
              </div>
            )}
            {error && <p className="text-xs text-red-400 mt-2 pl-1">{error}</p>}
          </CardContent>
        </Card>

        {/* ── Score SEO ── span 3 */}
        <Card className="col-span-12 md:col-span-3 bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Score SEO</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#27272a" strokeWidth="7"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="url(#sg)" strokeWidth="7"
                  strokeLinecap="round" strokeDasharray="238.76" strokeDashoffset="52"/>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-2xl font-medium text-zinc-100">78</span>
                <span className="text-[10px] text-zinc-500">/100</span>
              </div>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10">Bon</Badge>
          </CardContent>
        </Card>

        {/* ── Critères GEO ── span 5 */}
        <Card className="col-span-12 md:col-span-5 bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Analyse IA-compatibilité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {criteria.map(c => (
              <div key={c.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-zinc-400">{c.label}</span>
                  <span className="font-mono text-xs text-zinc-300">{c.score}%</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.color} transition-all duration-700`} style={{ width: `${c.score}%` }}/>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ── Améliorations ── span 4 */}
        <Card className="col-span-12 md:col-span-4 bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Points d'amélioration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 divide-y divide-zinc-800">
            {improvements.map(imp => (
              <div key={imp.label} className="flex items-center gap-3 py-2.5">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-200">{imp.label}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{imp.desc}</p>
                </div>
                <Badge variant={imp.color as 'destructive'|'secondary'|'outline'} className="shrink-0 text-[10px]">
                  {imp.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ── Stats ── span 12 */}
        <div className="col-span-12 grid grid-cols-3 gap-3">
          {[
            { label: 'Audits total', value: '2 847', delta: '↑ +12%', col: 'text-emerald-400' },
            { label: 'Score moyen',  value: '72/100', delta: '→ Stable', col: 'text-zinc-400'   },
            { label: 'Temps moyen', value: '< 60s', delta: '↓ -3s',  col: 'text-emerald-400' },
          ].map(s => (
            <Card key={s.label} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <p className="text-xs text-zinc-500 mb-1 uppercase tracking-widest">{s.label}</p>
                <p className="font-mono text-xl font-medium text-zinc-100">{s.value}</p>
                <p className={`text-xs mt-1 ${s.col}`}>{s.delta} ce mois</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </main>
  )
}
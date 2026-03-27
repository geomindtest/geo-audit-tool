'use client'

import { useState } from 'react'
import { saveAuditUrl } from '@/lib/supabase'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const isValidUrl = (value: string) => {
    try {
      new URL(value.startsWith('http') ? value : `https://${value}`)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const normalized = url.startsWith('http') ? url : `https://${url}`
    if (!isValidUrl(normalized)) {
      setError('Entrez une URL valide — ex: monsite.fr')
      return
    }
    setLoading(true)
    try {
      await saveAuditUrl(normalized)
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Erreur lors de l'envoi. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050A0E] text-white overflow-hidden relative font-sans">
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,200,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,150,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-cyan-500/8 blur-[140px]" />
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-md bg-emerald-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#050A0E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span className="text-sm font-semibold tracking-wide text-white/90">GEO Audit</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-xs text-white/40 font-medium">
          <a href="#how" className="hover:text-white/70 transition-colors">Comment ça marche</a>
          <a href="#pricing" className="hover:text-white/70 transition-colors">Tarifs</a>
          <button className="px-3.5 py-1.5 rounded-full border border-white/10 text-white/60 hover:border-emerald-500/50 hover:text-emerald-400 transition-all">Se connecter</button>
        </div>
      </nav>
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Generative Engine Optimization
        </div>
        <h1 className="max-w-3xl text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
          Votre site est-il{' '}
          <span className="relative inline-block" style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            visible par l'IA&nbsp;?
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-white/45 leading-relaxed">
          ChatGPT, Perplexity, Gemini… analysez comment les moteurs d'IA perçoivent votre site et obtenez un plan d'optimisation concret.
        </p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-12 w-full max-w-2xl">
            <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-1.5 shadow-[0_0_60px_rgba(16,185,129,0.08)] focus-within:border-emerald-500/40 focus-within:shadow-[0_0_80px_rgba(16,185,129,0.15)] transition-all duration-300">
              <div className="pl-4 pr-3 text-white/25">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <input type="text" value={url} onChange={(e) => { setUrl(e.target.value); setError('') }} placeholder="https://votre-site.fr" className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none py-3 pr-2" autoComplete="off" spellCheck={false} />
              <button type="submit" disabled={loading || !url.trim()} className="shrink-0 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold text-[#050A0E] transition-all duration-200 active:scale-95">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round"/></svg>
                    Analyse…
                  </span>
                ) : 'Analyser →'}
              </button>
            </div>
            {error && <p className="mt-3 text-xs text-red-400/80 text-left pl-2">{error}</p>}
            <p className="mt-4 text-xs text-white/20 text-center">Gratuit · Résultats en moins de 60 secondes · Sans inscription</p>
          </form>
        ) : (
          <div className="mt-12 w-full max-w-2xl rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="text-base font-semibold text-white/90">Audit en cours pour</p>
            <p className="mt-1 text-sm text-emerald-400 break-all">{url.startsWith('http') ? url : `https://${url}`}</p>
            <p className="mt-3 text-xs text-white/35">Vous recevrez votre rapport sous peu. Merci !</p>
            <button onClick={() => { setSubmitted(false); setUrl('') }} className="mt-5 text-xs text-white/30 hover:text-white/60 underline underline-offset-2 transition-colors">Analyser un autre site</button>
          </div>
        )}
      </section>
      <section className="relative z-10 flex flex-wrap justify-center gap-x-16 gap-y-6 px-8 pb-24">
        {[{ n: '2 400+', label: 'sites analysés' }, { n: '94%', label: 'score moyen amélioré' }, { n: '< 60s', label: "temps d'analyse" }].map(({ n, label }) => (
          <div key={label} className="text-center">
            <p className="text-3xl font-black text-white/90 tabular-nums">{n}</p>
            <p className="mt-1 text-xs text-white/30 font-medium">{label}</p>
          </div>
        ))}
      </section>
      <section id="how" className="relative z-10 max-w-4xl mx-auto px-8 pb-32">
        <h2 className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-12">Comment ça marche</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[{ step: '01', title: 'Soumettez votre URL', desc: "Entrez l'adresse de votre site. Pas besoin de compte." }, { step: '02', title: 'Analyse multi-moteurs', desc: 'Nous simulons l\'exploration par ChatGPT, Perplexity et Gemini.' }, { step: '03', title: 'Rapport & actions', desc: 'Recevez un score GEO et des recommandations priorisées.' }].map(({ step, title, desc }) => (
            <div key={step} className="rounded-xl border border-white/6 bg-white/3 p-6 hover:border-emerald-500/20 hover:bg-white/5 transition-all duration-300 group">
              <span className="text-[11px] font-bold tracking-widest text-emerald-500/60 group-hover:text-emerald-400 transition-colors">{step}</span>
              <h3 className="mt-3 text-sm font-semibold text-white/85">{title}</h3>
              <p className="mt-2 text-xs text-white/35 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="relative z-10 border-t border-white/5 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/20">© 2025 GEO Audit. Tous droits réservés.</p>
        <div className="flex gap-5 text-xs text-white/20">
          <a href="#" className="hover:text-white/50 transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-white/50 transition-colors">CGU</a>
          <a href="#" className="hover:text-white/50 transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  )
}

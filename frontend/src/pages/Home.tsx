import { Link } from 'react-router-dom'
import { mockContributors } from '@/lib/mockData'
import { useEffect, useState } from 'react'
import DemoDataBanner from '@/components/DemoDataBanner'

export default function Home() {
  const [counts, setCounts] = useState({ contributors: 0, focus: 0, flow: 0 })
  const [mounted, setMounted] = useState(false)

  const totalContributors = mockContributors.length
  const avgFocusHours = mockContributors.reduce((acc, c) =>
    acc + (c.productivity_metrics?.focus_hours || 0), 0
  ) / totalContributors
  const avgFlowIndex = mockContributors.reduce((acc, c) =>
    acc + (c.productivity_metrics?.flow_index || 0), 0
  ) / totalContributors

  // Animated counter effect
  useEffect(() => {
    setMounted(true)
    const duration = 1500
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      setCounts({
        contributors: Math.floor(totalContributors * progress),
        focus: parseFloat((avgFocusHours * progress).toFixed(1)),
        flow: Math.floor(avgFlowIndex * progress)
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative z-10 max-w-7xl mx-auto">
      {/* Hero Section — Clean first impression */}
      <div className="text-center pt-24 pb-20 relative min-h-[70vh] flex flex-col justify-center">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(170,255,0,0.1),transparent_70%)] blur-3xl pointer-events-none" />

        <div className={`relative transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#AAFF00]" />
            <span className="text-xs font-semibold uppercase tracking-[3px] text-[#AAFF00]" style={{ fontFamily: "'Source Code Pro', monospace" }}>People Intelligence Platform</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#AAFF00]" />
          </div>

          <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#F5F0EB] via-[#AAFF00] to-[#F5F0EB] bg-clip-text text-transparent" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Rhythm
          </h1>

          <p className="text-3xl md:text-4xl font-light text-[#A8A89A] mb-4 max-w-4xl mx-auto leading-snug" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            AI-Powered People Intelligence
            <br />
            <span className="text-[#AAFF00]">for Engineering Teams</span>
          </p>

          <p className="text-lg text-[#6B6B60] max-w-2xl mx-auto mb-12">
            Transform expert discovery from 3 days to 8 minutes. Know who knows what, who's at risk, and who's ready for the next challenge.
          </p>

          <Link
            to="/about"
            className="group inline-flex items-center gap-2.5 px-8 py-4 border border-white/15 rounded-lg font-medium text-[#A8A89A] hover:text-[#0D0D0D] hover:border-[#AAFF00] transition-all duration-350 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#AAFF00] to-[#7ACC00] opacity-0 group-hover:opacity-100 transition-opacity duration-350 rounded-lg" />
            <span className="relative z-10">Learn More</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>

      {/* Feature Demo Section */}
      <div className="space-y-10">
        {/* Section header */}
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[3px] text-[#AAFF00] block mb-4" style={{ fontFamily: "'Source Code Pro', monospace" }}>See It In Action</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F0EB] mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Explore the Platform</h2>
          <p className="text-[#6B6B60] max-w-xl mx-auto">Sample data from a real open-source team, demonstrating every capability.</p>
        </div>

        {/* Demo Data Banner */}
        <DemoDataBanner />

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Stat 1 */}
          <div className="group relative bg-[#171717] border border-white/6 rounded-2xl p-8 hover:border-[#AAFF00]/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#AAFF00]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative">
              <div className="text-[11px] font-semibold text-[#6B6B60] mb-3 uppercase tracking-[2px]" style={{ fontFamily: "'Source Code Pro', monospace" }}>Total Engineers</div>
              <div className="text-6xl font-bold text-[#AAFF00] mb-2" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                {counts.contributors}
              </div>
              <div className="text-xs text-[#6B6B60]" style={{ fontFamily: "'Source Code Pro', monospace" }}>from sample repository</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="group relative bg-[#171717] border border-white/6 rounded-2xl p-8 hover:border-[#FFB800]/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative">
              <div className="text-[11px] font-semibold text-[#6B6B60] mb-3 uppercase tracking-[2px]" style={{ fontFamily: "'Source Code Pro', monospace" }}>Avg Focus Hours</div>
              <div className="text-6xl font-bold text-[#FFB800] mb-2" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                {counts.focus}<span className="text-4xl opacity-60">h</span>
              </div>
              <div className="text-xs text-[#6B6B60]" style={{ fontFamily: "'Source Code Pro', monospace" }}>per week · optimal range</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="group relative bg-[#171717] border border-white/6 rounded-2xl p-8 hover:border-[#FF6B35]/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative">
              <div className="text-[11px] font-semibold text-[#6B6B60] mb-3 uppercase tracking-[2px]" style={{ fontFamily: "'Source Code Pro', monospace" }}>Team Flow Index</div>
              <div className="text-6xl font-bold text-[#FF6B35] mb-2" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                {counts.flow}<span className="text-4xl opacity-60">%</span>
              </div>
              <div className="text-xs text-[#6B6B60]" style={{ fontFamily: "'Source Code Pro', monospace" }}>High performance zone</div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* AI Expert Finder → Chat */}
          <Link to="/chat" className="group relative bg-[#171717] border border-white/6 rounded-2xl p-9 hover:border-[#AAFF00]/20 transition-all duration-500 overflow-hidden block hover:translate-y-[-6px] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#AAFF00]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#AAFF00]/15 to-[#AAFF00]/5 border border-[#AAFF00]/20 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]">
                <svg className="w-6 h-6 text-[#AAFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#F5F0EB] mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>AI Expert Finder</h3>
              <p className="text-[#6B6B60] leading-relaxed mb-5">
                "Who knows about authentication?" → Get Claude-powered recommendations in seconds. Natural language queries meet deep code analysis.
              </p>
              <div className="flex items-center text-[#AAFF00] text-sm font-semibold group-hover:gap-2.5 gap-1.5 transition-all duration-300" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                Try it out <span>→</span>
              </div>
            </div>
          </Link>

          {/* Developer Profiles → Contributors */}
          <Link to="/contributors" className="group relative bg-[#171717] border border-white/6 rounded-2xl p-9 hover:border-[#FFB800]/20 transition-all duration-500 overflow-hidden block hover:translate-y-[-6px] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#FFB800]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB800]/15 to-[#FFB800]/5 border border-[#FFB800]/20 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]">
                <svg className="w-6 h-6 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#F5F0EB] mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Developer Profiles</h3>
              <p className="text-[#6B6B60] leading-relaxed mb-5">
                Code expertise + productivity metrics + collaboration patterns. Complete visibility into every engineer's strengths and work style.
              </p>
              <div className="flex items-center text-[#FFB800] text-sm font-semibold group-hover:gap-2.5 gap-1.5 transition-all duration-300" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                View profiles <span>→</span>
              </div>
            </div>
          </Link>

          {/* Collaboration Networks → Network */}
          <Link to="/network" className="group relative bg-[#171717] border border-white/6 rounded-2xl p-9 hover:border-[#FF6B35]/20 transition-all duration-500 overflow-hidden block hover:translate-y-[-6px] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#FF6B35]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35]/15 to-[#FF6B35]/5 border border-[#FF6B35]/20 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]">
                <svg className="w-6 h-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#F5F0EB] mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Collaboration Networks</h3>
              <p className="text-[#6B6B60] leading-relaxed mb-5">
                Visualize team dynamics and collaboration patterns. See who works with who, identify silos, and optimize team composition.
              </p>
              <div className="flex items-center text-[#FF6B35] text-sm font-semibold group-hover:gap-2.5 gap-1.5 transition-all duration-300" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                Explore network <span>→</span>
              </div>
            </div>
          </Link>

          {/* Project Matching → About */}
          <Link to="/about" className="group relative bg-[#171717] border border-white/6 rounded-2xl p-9 hover:border-[#AAFF00]/20 transition-all duration-500 overflow-hidden block hover:translate-y-[-6px] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#AAFF00]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#AAFF00]/10 to-[#FFB800]/10 border border-[#AAFF00]/15 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]">
                <svg className="w-6 h-6 text-[#AAFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#F5F0EB] mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Smart Project Matching</h3>
              <p className="text-[#6B6B60] leading-relaxed mb-5">
                AI-powered staffing recommendations based on expertise AND availability. Right person, right project, right time.
              </p>
              <div className="flex items-center text-[#AAFF00] text-sm font-semibold group-hover:gap-2.5 gap-1.5 transition-all duration-300" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                Learn more <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

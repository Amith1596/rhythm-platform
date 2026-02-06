export default function About() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="relative text-center">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(170,255,0,0.12),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="relative">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-[#AAFF00] to-white bg-clip-text text-transparent">
            About Rhythm
          </h1>
          <p className="text-xl text-gray-400 font-mono max-w-3xl mx-auto">
            AI-Powered People Intelligence Platform for Engineering Teams
          </p>
        </div>
      </div>

      {/* The Problem */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8A5C] flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">⚠️</span>
          </div>
          <div>
            <h2 className="text-3xl font-black text-white mb-3">The Problem</h2>
            <div className="text-gray-400 space-y-3 leading-relaxed">
              <p>
                Engineering managers face a critical challenge: <span className="text-white font-semibold">expertise discovery takes 3+ days</span> of manual investigation through Slack threads, code reviews, and tribal knowledge.
              </p>
              <p>
                When staffing projects or debugging production issues, you need to know:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>"Who knows about our authentication system?"</li>
                <li>"Which developers are at risk of burnout?"</li>
                <li>"Who should I assign to this microservices migration?"</li>
              </ul>
              <p className="text-[#FF6B35] font-mono font-semibold">
                Traditional HRIS systems don't capture actual code expertise or real-time productivity signals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Solution */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#AAFF00] to-[#7ACC00] flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">💡</span>
          </div>
          <div>
            <h2 className="text-3xl font-black text-white mb-3">The Solution</h2>
            <div className="text-gray-400 space-y-3 leading-relaxed">
              <p>
                Rhythm transforms <span className="text-[#AAFF00] font-semibold">GitHub activity data into actionable people intelligence</span> using Claude AI.
              </p>
              <p>
                We automatically analyze:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Code commits</strong> - What technologies each developer actually works with</li>
                <li><strong className="text-white">PR reviews</strong> - Collaboration patterns and knowledge transfer</li>
                <li><strong className="text-white">Issue assignments</strong> - Domain expertise and problem-solving focus</li>
                <li><strong className="text-white">Calendar data</strong> - Meeting load, focus time, burnout risk indicators</li>
              </ul>
              <p className="text-[#AAFF00] font-mono font-semibold">
                Result: Expert discovery drops from 3 days to 8 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-6">
        <h2 className="text-4xl font-black text-white text-center mb-8">Key Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Expert Finder */}
          <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#AAFF00]/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#AAFF00]/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">AI Expert Finder</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ask "Who knows about authentication?" in natural language. Claude analyzes commit history, code patterns, and documentation contributions to recommend the right developers.
              </p>
            </div>
          </div>

          {/* Productivity Analytics */}
          <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#FFB800]/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Productivity Analytics</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Track focus hours, meeting load, and flow index for each developer. Identify burnout risk before it becomes a retention problem.
              </p>
            </div>
          </div>

          {/* Collaboration Intelligence */}
          <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35]/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Collaboration Networks</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Visualize who works with who through PR reviews and issue mentions. Identify knowledge silos and optimize team composition.
              </p>
            </div>
          </div>

          {/* Smart Project Matching */}
          <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#AAFF00]/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#AAFF00]/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Project Matching</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Paste a project description. AI recommends developers based on expertise AND current availability/workload. Right person, right project, right time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-3xl font-black text-white mb-6 text-center">How It Works</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#AAFF00]/20 flex items-center justify-center flex-shrink-0 font-black text-[#AAFF00] font-mono">
              1
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Connect Your GitHub Organization</h4>
              <p className="text-gray-400 text-sm">Provide your GitHub repo URLs. We fetch public data via GitHub API (read-only, secure).</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#FFB800]/20 flex items-center justify-center flex-shrink-0 font-black text-[#FFB800] font-mono">
              2
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">AI Analysis</h4>
              <p className="text-gray-400 text-sm">Claude analyzes commits, PRs, issues, and code changes to build expertise profiles for each developer.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#AAFF00]/20 flex items-center justify-center flex-shrink-0 font-black text-[#AAFF00] font-mono">
              3
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Real-Time Dashboard</h4>
              <p className="text-gray-400 text-sm">Access interactive dashboards, search for experts, track productivity metrics, and visualize collaboration networks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-3xl font-black text-white mb-6 text-center">Built With</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-2xl mb-2">⚛️</div>
            <div className="text-sm font-mono text-gray-300">React 19</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-2xl mb-2">🐍</div>
            <div className="text-sm font-mono text-gray-300">Django + DRF</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm font-mono text-gray-300">Claude Sonnet 4</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-mono text-gray-300">Recharts + D3</div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="relative bg-gradient-to-br from-[#FFB800]/10 to-[#E0A000]/5 backdrop-blur-xl border border-[#FFB800]/30 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">📌</div>
          <div>
            <h3 className="text-xl font-bold text-[#FFB800] mb-2">Demo Data Notice</h3>
            <p className="text-gray-300 leading-relaxed">
              This demo showcases Rhythm's capabilities using the <span className="font-mono text-white">fastapi/fastapi</span> repository as an example (7 core contributors). Productivity metrics and calendar data are simulated for demonstration purposes. Rhythm works with any GitHub organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

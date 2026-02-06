import { useState } from 'react'
import { Link } from 'react-router-dom'
import DemoDataBanner from '@/components/DemoDataBanner'
import { mockContributors } from '@/lib/mockData'

export default function Chat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: `Hello! I'm Rhythm AI, your expert finder assistant. I can help you discover the right person for any technical challenge.\n\nTry asking:\n• "Who knows about Python async patterns?"\n• "Who has experience with authentication?"\n• "Find someone who works on API design"`
    }
  ])

  const handleSend = () => {
    if (!message.trim()) return

    // Add user message
    const userMsg = message
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setMessage('')

    // Simulate AI response
    setTimeout(() => {
      const response = generateMockResponse(userMsg)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    }, 1000)
  }

  const generateMockResponse = (query: string) => {
    const lowerQuery = query.toLowerCase()

    // Match keywords to contributors
    if (lowerQuery.includes('python') || lowerQuery.includes('async') || lowerQuery.includes('api') || lowerQuery.includes('authentication')) {
      const contributors = mockContributors.filter(c =>
        c.expertise_summary?.toLowerCase().includes('python') ||
        c.expertise_summary?.toLowerCase().includes('backend') ||
        c.expertise_summary?.toLowerCase().includes('api')
      ).slice(0, 3)

      if (contributors.length > 0) {
        return `Based on code analysis, here are the top experts:\n\n${contributors.map((c, i) =>
          `**${i + 1}. ${c.name || c.username}** (@${c.username})\n${c.expertise_summary || c.summary}\n→ [View Profile](/contributors/${c.id})`
        ).join('\n\n')}\n\n**Analysis**: These developers have significant contributions in related areas based on commit history and code reviews.`
      }
    }

    if (lowerQuery.includes('frontend') || lowerQuery.includes('react') || lowerQuery.includes('typescript') || lowerQuery.includes('ui')) {
      const contributors = mockContributors.filter(c =>
        c.expertise_summary?.toLowerCase().includes('frontend') ||
        c.expertise_summary?.toLowerCase().includes('react') ||
        c.expertise_summary?.toLowerCase().includes('typescript')
      ).slice(0, 3)

      if (contributors.length > 0) {
        return `I found these frontend specialists:\n\n${contributors.map((c, i) =>
          `**${i + 1}. ${c.name || c.username}** (@${c.username})\n${c.expertise_summary || c.summary}\n→ [View Profile](/contributors/${c.id})`
        ).join('\n\n')}\n\n**Note**: Recommendations based on TypeScript/React contributions and PR review patterns.`
      }
    }

    if (lowerQuery.includes('security') || lowerQuery.includes('crypto') || lowerQuery.includes('auth')) {
      const contributors = mockContributors.filter(c =>
        c.expertise_summary?.toLowerCase().includes('security') ||
        c.summary?.toLowerCase().includes('security')
      ).slice(0, 2)

      if (contributors.length > 0) {
        return `Security experts on your team:\n\n${contributors.map((c, i) =>
          `**${i + 1}. ${c.name || c.username}** (@${c.username})\n${c.expertise_summary || c.summary}\n→ [View Profile](/contributors/${c.id})`
        ).join('\n\n')}\n\n**Security focus**: These developers have worked on authentication, cryptography, and security-related issues.`
      }
    }

    // Default response
    return `I analyzed your query "${query}" across all contributors.\n\nHere are the most relevant matches:\n\n${mockContributors.slice(0, 3).map((c, i) =>
      `**${i + 1}. ${c.name || c.username}** (@${c.username})\n${c.expertise_summary || c.summary}\n→ [View Profile](/contributors/${c.id})`
    ).join('\n\n')}\n\n💡 **Tip**: Try being more specific about technologies or problem areas for better recommendations.`
  }

  const suggestedQueries = [
    "Who knows about Python async patterns?",
    "Who has experience with React and TypeScript?",
    "Find someone who works on security",
    "Who's good at API design?",
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <DemoDataBanner />

      {/* Header */}
      <div className="relative text-center mb-8">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(170,255,0,0.08),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="relative">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3 bg-gradient-to-r from-[#F5F0EB] via-[#AAFF00] to-[#F5F0EB] bg-clip-text text-transparent" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            AI Expert Finder
          </h1>
          <p className="text-lg text-[#6B6B60]" style={{ fontFamily: "'Source Code Pro', monospace" }}>
            Ask who knows what in natural language
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {/* API Key Notice */}
        <div className="bg-[#FFB800]/10 border-b border-[#FFB800]/20 px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
            <span className="text-[#FFB800] font-mono font-semibold">DEMO MODE</span>
            <span className="text-gray-400">- Simulated responses. Add ANTHROPIC_API_KEY for real AI analysis.</span>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-[#AAFF00]/20 border border-[#AAFF00]/30 text-white'
                    : 'bg-white/10 border border-white/20 text-gray-300'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#AAFF00] to-[#7ACC00] flex items-center justify-center">
                      <span className="text-xs font-black">R</span>
                    </div>
                    <span className="text-xs font-mono text-[#AAFF00] font-semibold">Rhythm AI</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content.split(/\[View Profile\]\((\/contributors\/\d+)\)/).map((part, i) => {
                    if (part.startsWith('/contributors/')) {
                      return (
                        <Link
                          key={i}
                          to={part}
                          className="text-[#AAFF00] hover:text-white underline font-semibold"
                        >
                          View Profile
                        </Link>
                      )
                    }
                    return <span key={i}>{part}</span>
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Queries (show when no messages yet) */}
        {messages.length === 1 && (
          <div className="border-t border-white/10 px-6 py-4">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">Suggested Queries:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => setMessage(query)}
                  className="text-left px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#AAFF00]/30 transition-all duration-200"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-white/10 p-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask who knows about something..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-500 font-mono focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 focus:border-[#AAFF00]/50"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="px-6 py-3 bg-gradient-to-r from-[#AAFF00] to-[#7ACC00] rounded-lg font-bold text-white hover:shadow-[0_0_30px_rgba(170,255,0,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-mono">
            Try: "Who knows about [technology]?" or "Find an expert in [area]"
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-white mb-2">Natural Language</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Ask in plain English. No need to know exact usernames or repositories.
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-3xl mb-4">🤖</div>
          <h3 className="text-lg font-bold text-white mb-2">AI Analysis</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Claude analyzes commit messages, code patterns, and PR reviews to find experts.
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-lg font-bold text-white mb-2">Instant Results</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Get ranked recommendations in seconds, not days of manual investigation.
          </p>
        </div>
      </div>
    </div>
  )
}

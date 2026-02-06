import { useState } from 'react'
import { mockContributors, mockCollaborations, getCollaboratorCount } from '@/lib/mockData'
import DemoDataBanner from '@/components/DemoDataBanner'
import { Link } from 'react-router-dom'

interface NodePosition {
  id: number
  name: string
  username: string
  x: number
  y: number
  flow_index: number
  burnout_risk: string
}

export default function CollaborationNetwork() {
  const [selectedNode, setSelectedNode] = useState<NodePosition | null>(null)

  // Position nodes in a circle
  const centerX = 400
  const centerY = 300
  const radius = 200

  const nodes: NodePosition[] = mockContributors.map((c, i) => {
    const angle = (i / mockContributors.length) * 2 * Math.PI - Math.PI / 2
    return {
      id: c.id,
      name: c.name || c.username,
      username: c.username,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      flow_index: c.productivity_metrics?.flow_index || 70,
      burnout_risk: c.productivity_metrics?.burnout_risk || 'low',
    }
  })

  const getNodeColor = (node: NodePosition) => {
    if (node.burnout_risk === 'high') return '#FF6B35'
    if (node.flow_index >= 85) return '#AAFF00'
    if (node.flow_index >= 75) return '#AAFF00'
    return '#FFB800'
  }

  const getNodeSize = (nodeId: number) => {
    const count = mockCollaborations.filter(
      c => c.from === nodeId || c.to === nodeId
    ).length
    return 12 + count * 3
  }

  const isConnected = (nodeId: number) => {
    if (!selectedNode) return true
    if (nodeId === selectedNode.id) return true
    return mockCollaborations.some(
      c => (c.from === selectedNode.id && c.to === nodeId) ||
           (c.to === selectedNode.id && c.from === nodeId)
    )
  }

  const isLinkHighlighted = (from: number, to: number) => {
    if (!selectedNode) return false
    return from === selectedNode.id || to === selectedNode.id
  }

  // Stats — use unique collaborator count (not edge count)
  const mostConnected = nodes.reduce((max, node) => {
    const count = getCollaboratorCount(node.id)
    return count > max.count ? { node, count } : max
  }, { node: nodes[0], count: 0 })

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <DemoDataBanner />

      {/* Header */}
      <div className="relative text-center mb-8">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,107,53,0.08),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="relative">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3 bg-gradient-to-r from-white via-[#FF6B35] to-white bg-clip-text text-transparent">
            Collaboration Network
          </h1>
          <p className="text-lg text-gray-400 font-mono">
            Visualize team dynamics and collaboration patterns
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">Team Size</div>
          <div className="text-4xl font-black font-mono text-[#AAFF00] mb-1">{nodes.length}</div>
          <div className="text-xs text-gray-500 font-mono">Active contributors</div>
        </div>
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">Connections</div>
          <div className="text-4xl font-black font-mono text-[#FFB800] mb-1">{mockCollaborations.length}</div>
          <div className="text-xs text-gray-500 font-mono">Collaboration pairs</div>
        </div>
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">Most Connected</div>
          <div className="text-xl font-black text-[#AAFF00] mb-1">{mostConnected.node.name}</div>
          <div className="text-xs text-gray-500 font-mono">{mostConnected.count} collaborators</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden p-4">
          {/* Legend */}
          <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-[#AAFF00]" />
              <span className="text-gray-300 font-mono">High Flow (85+)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-[#AAFF00]" />
              <span className="text-gray-300 font-mono">Good Flow (75-84)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
              <span className="text-gray-300 font-mono">Normal (&lt;75)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
              <span className="text-gray-300 font-mono">At Risk</span>
            </div>
          </div>

          <svg
            viewBox="0 0 800 600"
            className="w-full h-[600px] cursor-pointer"
            onClick={() => setSelectedNode(null)}
          >
            {/* Links */}
            {mockCollaborations.map((collab, idx) => {
              const sourceNode = nodes.find(n => n.id === collab.from)
              const targetNode = nodes.find(n => n.id === collab.to)
              if (!sourceNode || !targetNode) return null

              const highlighted = isLinkHighlighted(collab.from, collab.to)
              const dimmed = selectedNode && !highlighted

              return (
                <line
                  key={idx}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={highlighted ? '#AAFF00' : 'rgba(170, 255, 0, 0.25)'}
                  strokeWidth={highlighted ? collab.weight / 4 : collab.weight / 8}
                  opacity={dimmed ? 0.1 : 1}
                  className="transition-all duration-300"
                />
              )
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const size = getNodeSize(node.id)
              const connected = isConnected(node.id)

              return (
                <g
                  key={node.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedNode(node)
                  }}
                  className="cursor-pointer"
                >
                  {/* Glow effect */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={size + 6}
                    fill={getNodeColor(node)}
                    opacity={selectedNode?.id === node.id ? 0.3 : 0}
                    className="transition-all duration-300"
                  />
                  {/* Node */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={size}
                    fill={getNodeColor(node)}
                    stroke={selectedNode?.id === node.id ? 'white' : 'transparent'}
                    strokeWidth={2}
                    opacity={connected ? 1 : 0.2}
                    className="transition-all duration-300"
                  />
                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + size + 16}
                    textAnchor="middle"
                    fill={connected ? 'white' : 'rgba(255,255,255,0.2)'}
                    fontSize="13"
                    fontFamily="'DM Sans', sans-serif"
                    fontWeight="600"
                    className="transition-all duration-300"
                  >
                    {node.name.split(' ')[0]}
                  </text>
                  {/* Username */}
                  <text
                    x={node.x}
                    y={node.y + size + 30}
                    textAnchor="middle"
                    fill={connected ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'}
                    fontSize="10"
                    fontFamily="'JetBrains Mono', monospace"
                    className="transition-all duration-300"
                  >
                    @{node.username}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {selectedNode ? (
            <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">{selectedNode.name}</h3>
                <p className="text-sm text-gray-400 font-mono">@{selectedNode.username}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Flow Index</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${selectedNode.flow_index}%`,
                          backgroundColor: getNodeColor(selectedNode),
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold font-mono text-white">{selectedNode.flow_index}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Burnout Risk</div>
                  <span className={`text-sm font-bold font-mono ${
                    selectedNode.burnout_risk === 'high' ? 'text-[#FF6B35]' :
                    selectedNode.burnout_risk === 'medium' ? 'text-[#FFB800]' :
                    'text-[#AAFF00]'
                  }`}>
                    {selectedNode.burnout_risk.toUpperCase()}
                  </span>
                </div>

                <div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Collaborators</div>
                  <div className="text-sm font-bold font-mono text-white">
                    {getCollaboratorCount(selectedNode.id)}
                  </div>
                </div>
              </div>

              <Link
                to={`/contributors/${selectedNode.id}`}
                className="block w-full text-center px-4 py-2 bg-gradient-to-r from-[#AAFF00] to-[#7ACC00] rounded-lg font-bold text-white hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300"
              >
                View Full Profile
              </Link>
            </div>
          ) : (
            <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm">
                Click on a node to see contributor details and collaboration patterns
              </p>
            </div>
          )}

          {/* Insights */}
          <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Network Insights</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-[#AAFF00]">✓</span>
                <span>Strong collaboration between frontend and product teams</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FFB800]">⚠</span>
                <span>DevOps team shows signs of knowledge silos</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#AAFF00]">ℹ</span>
                <span>Security expert collaborates across all teams</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

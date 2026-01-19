import { Link } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { mockContributors } from '@/lib/mockData'

export default function Home() {
  const totalContributors = mockContributors.length
  const avgFocusHours = mockContributors.reduce((acc, c) =>
    acc + (c.productivity_metrics?.focus_hours_per_week || 0), 0
  ) / totalContributors

  const avgFlowIndex = mockContributors.reduce((acc, c) =>
    acc + (c.productivity_metrics?.flow_index || 0), 0
  ) / totalContributors

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-primary-900 mb-4">
          Rhythm Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-Powered People Intelligence for Engineering Teams
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/contributors">
            <Button size="lg">View Contributors</Button>
          </Link>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {totalContributors}
            </div>
            <div className="text-gray-600 font-medium">Contributors</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary-600 mb-2">
              {avgFocusHours.toFixed(1)}h
            </div>
            <div className="text-gray-600 font-medium">Avg Focus Hours/Week</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent-600 mb-2">
              {avgFlowIndex.toFixed(0)}%
            </div>
            <div className="text-gray-600 font-medium">Avg Flow Index</div>
          </div>
        </Card>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <Card>
          <h3 className="text-xl font-bold text-primary-900 mb-3">
            🎯 AI Expert Finder
          </h3>
          <p className="text-gray-600 mb-4">
            Natural language queries to find the right expert instantly.
            "Who knows about authentication?" → Get AI-powered recommendations.
          </p>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-primary-900 mb-3">
            📊 Developer Profiles
          </h3>
          <p className="text-gray-600 mb-4">
            Code expertise, productivity metrics, and collaboration patterns
            all in one place.
          </p>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-primary-900 mb-3">
            🌐 Collaboration Intelligence
          </h3>
          <p className="text-gray-600 mb-4">
            Visualize collaboration networks and team dynamics.
            Understand who works with who.
          </p>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-primary-900 mb-3">
            🤝 Project Matching
          </h3>
          <p className="text-gray-600 mb-4">
            AI-powered recommendations for staffing projects based on
            expertise AND availability.
          </p>
        </Card>
      </div>
    </div>
  )
}

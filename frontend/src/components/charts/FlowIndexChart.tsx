import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { WeeklyProductivity } from '@/lib/mockData'

interface FlowIndexChartProps {
  data: WeeklyProductivity[]
  height?: number
}

export default function FlowIndexChart({ data, height = 250 }: FlowIndexChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="week"
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          domain={[0, 100]}
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
          label={{ value: 'Flow Index (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '12px'
          }}
          formatter={(value: number) => [`${value}%`, 'Flow Index']}
        />
        <ReferenceLine
          y={75}
          stroke="#10b981"
          strokeDasharray="3 3"
          label={{ value: 'Healthy', position: 'right', fill: '#10b981', fontSize: '11px' }}
        />
        <ReferenceLine
          y={60}
          stroke="#f59e0b"
          strokeDasharray="3 3"
          label={{ value: 'At Risk', position: 'right', fill: '#f59e0b', fontSize: '11px' }}
        />
        <Line
          type="monotone"
          dataKey="flowIndex"
          stroke="#F4B4B4"
          strokeWidth={3}
          dot={{ fill: '#F4B4B4', r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

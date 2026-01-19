import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { WeeklyProductivity } from '@/lib/mockData'

interface ProductivityChartProps {
  data: WeeklyProductivity[]
  height?: number
}

export default function ProductivityChart({ data, height = 300 }: ProductivityChartProps) {
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
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
          label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '12px'
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
        />
        <Line
          type="monotone"
          dataKey="focusHours"
          stroke="#1D1F73"
          strokeWidth={3}
          name="Focus Hours"
          dot={{ fill: '#1D1F73', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="meetingHours"
          stroke="#3BA3A3"
          strokeWidth={3}
          name="Meeting Hours"
          dot={{ fill: '#3BA3A3', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

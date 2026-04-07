import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

function formatCurrency(value) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
      <p className="text-gray-400 text-sm mb-2">Year {label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">${entry.value.toLocaleString()}</span>
        </p>
      ))}
      {payload.length === 2 && (
        <p className="text-red-400 text-sm mt-1 pt-1 border-t border-gray-700">
          Gap: <span className="font-bold">${(payload[1].value - payload[0].value).toLocaleString()}</span>
        </p>
      )}
    </div>
  )
}

export default function FeeChart({ yearByYear }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">The fee drag, visualized</h3>
      <p className="text-gray-400 text-sm mb-6">
        The growing gap between the lines is the price of your ILP.
      </p>
      <div className="w-full h-[350px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={yearByYear} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="year" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="ilpValue" name="Your ILP" stroke="#ef4444" strokeWidth={2.5} fill="url(#redGradient)" />
            <Area type="monotone" dataKey="sp500Value" name="S&P 500 ETF" stroke="#22c55e" strokeWidth={2.5} fill="url(#greenGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-6 justify-center mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-gray-400">Your ILP (after fees)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-400">S&P 500 ETF (0.03% fee)</span>
        </div>
      </div>
    </div>
  )
}

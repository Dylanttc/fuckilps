import { useState } from 'react'

export default function YearlyTable({ yearByYear }) {
  const [expanded, setExpanded] = useState(false)
  const displayData = expanded ? yearByYear : yearByYear.slice(0, 5)

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Year-by-year: watch your money disappear</h3>
      <p className="text-gray-400 text-sm mb-6">Every row is a year of fees silently eating your returns.</p>
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900 text-gray-400 text-left">
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium text-right">Premiums paid</th>
              <th className="px-4 py-3 font-medium text-right">Fees paid</th>
              <th className="px-4 py-3 font-medium text-right text-red-400">ILP value</th>
              <th className="px-4 py-3 font-medium text-right text-green-400">S&P 500</th>
              <th className="px-4 py-3 font-medium text-right">You lost</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row) => (
              <tr key={row.year} className="border-t border-gray-800/50 hover:bg-gray-900/50 transition-colors">
                <td className="px-4 py-3 text-gray-300">{row.year}</td>
                <td className="px-4 py-3 text-right text-gray-400">${row.premiumsPaid.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-yellow-500 font-medium">${row.feesPaid.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-red-400 font-medium">${row.ilpValue.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-green-400 font-medium">${row.sp500Value.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-red-300 font-bold">-${row.difference.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {yearByYear.length > 5 && (
        <button onClick={() => setExpanded(!expanded)} className="mt-4 text-sm text-gray-500 hover:text-white transition-colors">
          {expanded ? '‚Üê Show less' : `Show all ${yearByYear.length} years ‚Üí`}
        </button>
      )}
    </div>
  )
}

import { useState, useMemo } from 'react'
import FeeChart from './FeeChart'
import FunComparisons from './FunComparisons'
import YearlyTable from './YearlyTable'
import Disclaimer from './Disclaimer'
import { calculateProjections } from '../utils/calculations'

export default function ResultsDashboard({ results: initialResults, inputs, onBack }) {
  const [years, setYears] = useState(inputs.policyTermYears)

  const results = useMemo(() => {
    return calculateProjections({ ...inputs, policyTermYears: years })
  }, [inputs, years])

  const { totalPremiumsPaid, totalFeesPaid, finalIlpValue, finalSp500Value, totalDifference, yearByYear } = results

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={onBack} className="text-gray-500 hover:text-white text-sm mb-8 transition-colors">‚Üê Change inputs</button>

        <div className="mb-16">
          <FunComparisons totalDifference={totalDifference} totalFeesPaid={totalFeesPaid} />
        </div>

        <div className="mb-12">
          <div className="border-t border-gray-800 pt-12">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-3">The cold, hard math</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Over {years} years, your ILP will cost you</h2>
            <div className="text-5xl sm:text-7xl font-black text-red-500 mb-4">${totalDifference.toLocaleString()}</div>
            <p className="text-xl text-gray-400">in lost returns compared to a simple S&P 500 index fund.</p>
            <p className="text-sm text-gray-600 mt-2">And this is the <em>conservative</em> estimate.</p>
          </div>
        </div>

        <div className="mb-16 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-300">Projection period</label>
            <span className="text-2xl font-black text-white">{years} years</span>
          </div>
          <input type="range" min="5" max="40" step="1" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500" />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>5 years</span>
            <span>40 years</span>
          </div>
          <p className="text-xs text-gray-500 mt-3">Drag to see how fees compound over time. The longer you hold, the worse it gets.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-sm text-gray-500 mb-1">Total premiums paid</div>
            <div className="text-2xl font-bold">${totalPremiumsPaid.toLocaleString()}</div>
          </div>
          <div className="bg-gray-900 border border-red-900/50 rounded-xl p-5">
            <div className="text-sm text-gray-500 mb-1">Your ILP value</div>
            <div className="text-2xl font-bold text-red-400">${finalIlpValue.toLocaleString()}</div>
          </div>
          <div className="bg-gray-900 border border-green-900/50 rounded-xl p-5">
            <div className="text-sm text-gray-500 mb-1">If you invested in S&P 500</div>
            <div className="text-2xl font-bold text-green-400">${finalSp500Value.toLocaleString()}</div>
          </div>
        </div>

        <div className="mb-16"><FeeChart yearByYear={yearByYear} /></div>
        <div className="mb-16"><YearlyTable yearByYear={yearByYear} /></div>
        <div className="mb-16"><Disclaimer /></div>

        <div className="text-center py-12 border-t border-gray-800">
          <h3 className="text-2xl font-bold mb-3">Know someone with an ILP?</h3>
          <p className="text-gray-400 mb-6">Share this with them. They deserve to see the math.</p>
          <button onClick={() => { if (navigator.share) { navigator.share({ title: 'FeeCheck', text: `My ILP will cost me $${totalDifference.toLocaleString()} in lost returns over ${years} years.`, url: window.location.href }) } else { navigator.clipboard.writeText(window.location.href); alert('Link copied!') } }} className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors">Share this result</button>
        </div>

        <footer className="text-center text-xs text-gray-600 pb-8">Built as a public good for financial literacy in Singapore.<br />Not financial advice. Just math.</footer>
      </div>
    </div>
  )
}

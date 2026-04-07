import { getComparisons } from '../utils/comparisons'

export default function FunComparisons({ totalDifference, totalFeesPaid }) {
  const comparisons = getComparisons(totalDifference)
  return (
    <div>
      <p className="text-gray-500 text-sm uppercase tracking-wider mb-3">
        Congratulations
      </p>
      <h2 className="text-3xl sm:text-4xl font-black mb-3">
        Here's what your FA can buy with{' '}
        <span className="text-red-500">your money</span>
      </h2>
      <p className="text-gray-400 mb-2">
        You're not just losing returns ‚Äî you're funding someone else's lifestyle.
        From the <span className="text-white font-semibold">${totalDifference.toLocaleString()}</span> you
        lost to your ILP, your financial advisor could treat themselves to:
      </p>
      <p className="text-xs text-gray-600 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {comparisons.map((item) => (
          <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-red-900/50 transition-colors">
            <div className="text-3xl mb-2">{item.emoji}</div>
            <div className="text-2xl font-bold text-white mb-1">{item.displayText}</div>
            <div className="text-sm text-gray-500">{item.subtext}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-6 italic">
        "Your agent is thanking you for giving him a down payment for his next BMW."
        <span className="not-italic"> ‚Äî r/singaporefi</span>
      </p>
    </div>
  )
}

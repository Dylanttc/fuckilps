export default function Disclaimer() {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-3 text-gray-300">‚ö†Ô∏è Important disclaimers</h3>
      <ul className="space-y-2 text-sm text-gray-500 list-disc list-inside">
        <li>This tool uses <strong className="text-gray-400">8% average annual returns</strong> based on the S&P 500 historical average. Actual returns will vary ‚Äî past performance does not guarantee future results.</li>
        <li>This is a <strong className="text-gray-400">conservative estimate</strong>. Real ILP costs are likely higher due to front-loaded premium allocation, bid-offer spreads, and administrative fees not captured here.</li>
        <li>This tool <strong className="text-gray-400">does not account for the insurance coverage</strong> component of your ILP. If you need life insurance, compare the cost of a separate term life policy.</li>
        <li><strong className="text-gray-400">ILPs are not inherently bad for everyone.</strong> For some individuals ‚Äî particularly those whose alternative is to not invest at all ‚Äî an ILP may still be better than no investment.</li>
        <li>This is <strong className="text-gray-400">not financial advice</strong>. We're just showing you the math. Consult a licensed financial advisor for personalized guidance.</li>
      </ul>
    </div>
  )
}

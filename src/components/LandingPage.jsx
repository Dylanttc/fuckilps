import { useState } from 'react'

const DEFAULT_VALUES = {
  monthlyPremium: 350,
  policyTermYears: 25,
  fundManagementFeePct: 1.5,
  insuranceWrapperFeePct: 1.0,
  salesChargePct: 5,
}

export default function LandingPage({ onCalculate }) {
  const [values, setValues] = useState(DEFAULT_VALUES)

  const handleChange = (field) => (e) => {
    setValues((prev) => ({
      ...prev,
      [field]: parseFloat(e.target.value) || 0,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onCalculate(values)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col items-center pt-16 sm:pt-24 px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
            The numbers your FA{' '}
            <span className="text-red-500">hopes you never</span>{' '}
            calculate.
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-16 max-w-xl mx-auto">
            Enter your ILP details below. We'll show you exactly how much you're
            losing to fees ‚Äî and what you'd have if you just invested in the S&P 500.
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        <div className="border-t border-gray-800 mb-12" />
      </div>

      <div className="flex flex-col items-center px-6 pb-20">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-black mb-2 text-center">
            Enter your ILP details
          </h2>
          <p className="text-gray-400 text-center mb-8 text-sm">
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Monthly premium (SGD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={values.monthlyPremium}
                  onChange={handleChange('monthlyPremium')}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  min="0"
                  step="50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Policy term (years)
              </label>
              <input
                type="number"
                value={values.policyTermYears}
                onChange={handleChange('policyTermYears')}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Fund management fee (% p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={values.fundManagementFeePct}
                  onChange={handleChange('fundManagementFeePct')}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 pr-10 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  min="0"
                  max="10"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Insurance / wrapper fee (% p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={values.insuranceWrapperFeePct}
                  onChange={handleChange('insuranceWrapperFeePct')}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 pr-10 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  min="0"
                  max="10"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Sales / distribution charge (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={values.salesChargePct}
                  onChange={handleChange('salesChargePct')}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 pr-10 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  min="0"
                  max="20"
                  step="0.5"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Also called bid-offer spread. Typically 3‚Äì5% for Singapore ILPs.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-red-600/25 mt-4"
            >
              Show me the damage ‚Üí
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-6 text-center">
            Your data never leaves your browser. All calculations run locally.
          </p>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-600 py-6 px-4 border-t border-gray-900">
        This is not financial advice. Built as a public good for financial literacy in Singapore.
      </footer>
    </div>
  )
}

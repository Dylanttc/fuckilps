const MARKET_RETURN = 0.08
const ETF_FEE = 0.0003

export function calculateProjections({
  monthlyPremium,
  policyTermYears,
  fundManagementFeePct,
  insuranceWrapperFeePct,
  salesChargePct = 0,
}) {
  const annualContribution = monthlyPremium * 12
  const totalAnnualFee = (fundManagementFeePct + insuranceWrapperFeePct) / 100
  const salesCharge = salesChargePct / 100

  const yearByYear = []
  let ilpValue = 0
  let sp500Value = 0
  let totalPremiumsPaid = 0
  let totalFeesPaid = 0

  for (let year = 1; year <= policyTermYears; year++) {
    totalPremiumsPaid += annualContribution
    const ilpContribution = annualContribution * (1 - salesCharge)
    const sp500Contribution = annualContribution

    ilpValue = (ilpValue + ilpContribution) * (1 + MARKET_RETURN - totalAnnualFee)
    sp500Value = (sp500Value + sp500Contribution) * (1 + MARKET_RETURN - ETF_FEE)

    const feesThisYear = (ilpValue + ilpContribution) * totalAnnualFee
      + annualContribution * salesCharge
    totalFeesPaid += feesThisYear

    yearByYear.push({
      year,
      premiumsPaid: Math.round(totalPremiumsPaid),
      feesPaid: Math.round(totalFeesPaid),
      ilpValue: Math.round(ilpValue),
      sp500Value: Math.round(sp500Value),
      difference: Math.round(sp500Value - ilpValue),
    })
  }

  return {
    yearByYear,
    totalPremiumsPaid: Math.round(totalPremiumsPaid),
    totalFeesPaid: Math.round(totalFeesPaid),
    finalIlpValue: Math.round(ilpValue),
    finalSp500Value: Math.round(sp500Value),
    totalDifference: Math.round(sp500Value - ilpValue),
  }
}

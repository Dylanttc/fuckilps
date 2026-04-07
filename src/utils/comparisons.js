const COMPARISONS = [
  {
    id: 'iphone',
    name: 'iPhone 17',
    unitPrice: 1599,
    emoji: 'üì±',
    template: (count) => `${count} iPhone 17${count !== 1 ? 's' : ''}`,
    subtext: 'At S$1,599 each',
  },
  {
    id: 'tokyo',
    name: 'Business class flights to Tokyo',
    unitPrice: 4500,
    emoji: '‚úàÔ∏è',
    template: (count) => `${count} business class flight${count !== 1 ? 's' : ''} to Tokyo`,
    subtext: 'Singapore Airlines, return',
  },
  {
    id: 'chickenrice',
    name: 'Plates of chicken rice',
    unitPrice: 3.50,
    emoji: 'üçó',
    template: (count) => `${count.toLocaleString()} plates of chicken rice`,
    subtext: 'At S$3.50 per plate',
  },
  {
    id: 'hdb',
    name: 'HDB down payment',
    unitPrice: 70000,
    emoji: 'üè†',
    template: (count) => count >= 1
      ? `${Math.floor(count)} HDB down payment${Math.floor(count) !== 1 ? 's' : ''}`
      : `${Math.round(count * 100)}% of an HDB down payment`,
    subtext: '10% down on a S$700K flat',
  },
]

export function getComparisons(totalAmount) {
  return COMPARISONS.map((item) => {
    const count = totalAmount / item.unitPrice
    const displayCount = count >= 1 ? Math.floor(count) : count
    return {
      ...item,
      count: displayCount,
      displayText: item.template(count >= 1 ? Math.floor(count) : count),
    }
  })
}

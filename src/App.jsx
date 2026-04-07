import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ResultsDashboard from './components/ResultsDashboard'
import { calculateProjections } from './utils/calculations'

export default function App() {
  const [page, setPage] = useState('landing')
  const [results, setResults] = useState(null)
  const [inputs, setInputs] = useState(null)

  const handleCalculate = (formValues) => {
    const projections = calculateProjections(formValues)
    setInputs(formValues)
    setResults(projections)
    setPage('results')
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setPage('landing')
    window.scrollTo(0, 0)
  }

  return (
    <>
      {page === 'landing' && <LandingPage onCalculate={handleCalculate} />}
      {page === 'results' && results && <ResultsDashboard results={results} inputs={inputs} onBack={handleBack} />}
    </>
  )
}

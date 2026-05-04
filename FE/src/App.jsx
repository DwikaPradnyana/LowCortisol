import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HowItWorksPage from './pages/HowItWorksPage'
import InsightsPage from './pages/InsightsPage'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/signin" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
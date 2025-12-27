import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage.jsx'
import ChatDemo from './components/views/chatdemo.jsx'
import AuthPage from './components/views/AuthPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatDemo />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
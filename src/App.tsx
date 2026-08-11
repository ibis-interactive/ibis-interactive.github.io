import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PrivacyPage from './pages/PrivacyPage'
import GamePage from './pages/GamePage'

export default function App() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/politicas-privacidad" element={<PrivacyPage />} />
    <Route path="/juegos/:slug" element={<GamePage />} />
    <Route path="*" element={<HomePage />} />
  </Routes>
}

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
const NotFoundPage = lazy(() => import('./pages/not-found/NotFoundPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const GamePage = lazy(() => import('./pages/GamePage'))
const ChangelogsPage = lazy(() => import('./pages/ChangelogsPage'))
const SocialPage = lazy(() => import('./pages/social/SocialPage'))

export default function App() {
  return <Suspense fallback={<div className="container py-5" role="status" aria-busy="true">Cargando / Loading...</div>}><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/social" element={<SocialPage />} />
    <Route path="/politicas-privacidad" element={<PrivacyPage />} />
    <Route path="/juegos/:slug" element={<GamePage />} />
    <Route path="/juegos/:gameId/changelogs" element={<ChangelogsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></Suspense>
}

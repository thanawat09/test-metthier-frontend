import MainLayout from '@/layouts/MainLayout'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

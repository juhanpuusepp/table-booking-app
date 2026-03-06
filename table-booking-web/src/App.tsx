import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainView from './views/MainView/MainView'
import RecommendationsView from './views/RecommendationsView/RecommendationsView'
import ReservationView from './views/ReservationView/ReservationView'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/recommendations" element={<RecommendationsView />} />
        <Route path="/reservation" element={<ReservationView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

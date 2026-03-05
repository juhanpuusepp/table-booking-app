import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainView from './views/MainView/MainView'
import RecommendationsView from './views/RecommendationsView/RecommendationsView'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/recommendations" element={<RecommendationsView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

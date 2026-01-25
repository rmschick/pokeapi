import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ResponsiveAppBar from './components/AppBar'
import { HomePage } from './pages/HomePage'
import { PokemonPage } from './features/pokemon/pages/PokemonPage'
import { PokemonDetailPage } from './features/pokemon/pages/PokemonDetailPage'
import { BerriesPage } from './features/berries/pages/BerriesPage'
import { ItemsPage } from './features/items/pages/ItemsPage'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon" element={<PokemonPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        <Route path="/berries" element={<BerriesPage />} />
        <Route path="/items" element={<ItemsPage />} />
      </Routes>
    </Router>
  )
}

export default App

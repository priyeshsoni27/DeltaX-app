import './App.css'
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import Song from './pages/Song'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addsong" element={<Song />} />
      </Routes>
    </div>
  )
}

export default App

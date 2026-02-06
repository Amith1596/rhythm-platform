import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ContributorsList from './pages/ContributorsList'
import DeveloperProfile from './pages/DeveloperProfile'
import About from './pages/About'
import Chat from './pages/Chat'
import CollaborationNetwork from './pages/CollaborationNetwork'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contributors" element={<ContributorsList />} />
          <Route path="/contributors/:id" element={<DeveloperProfile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/network" element={<CollaborationNetwork />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

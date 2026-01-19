import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ContributorsList from './pages/ContributorsList'
import DeveloperProfile from './pages/DeveloperProfile'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contributors" element={<ContributorsList />} />
          <Route path="/contributors/:id" element={<DeveloperProfile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

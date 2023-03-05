import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import DashboardLayout from './layouts/dashboardlayout'
import './App.css'

function App (): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<DashboardLayout/>}>
          <Route index element={<h1>Home dashboard</h1>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

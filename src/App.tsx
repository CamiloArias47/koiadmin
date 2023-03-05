import { Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import DashboardLayout from './layouts/dashboardlayout'
import { UIprovider } from './context/UIcontext'
import './App.css'

function App (): JSX.Element {
  return (
    <div className="App">
      <UIprovider>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<DashboardLayout/>}>
            <Route index element={<h1>Home dashboard</h1>} />
          </Route>
        </Routes>
      </UIprovider>
    </div>
  )
}

export default App

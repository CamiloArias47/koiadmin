import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import DashboardLayout from './layouts/main/dashboardlayout'

function App (): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<DashboardLayout/>}>
          <Route index element={<h1>Home 🏡</h1>} />
          <Route path='/products' element={<h1>productos 🛒</h1>} />
          <Route path='/sales' element={<h1>Ventas 💵</h1>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/login/login'
import DashboardLayout from './layouts/dashboardlayout'
import { useUIcontext } from './context/UIcontext'
import useLogin from './hooks/useLogin'

function App (): JSX.Element {
  const { userLoggedIn } = useUIcontext()
  const { userLoginStatus } = useLogin()

  useEffect(() => {
    userLoginStatus(loginStatus => {
      if (loginStatus && userLoggedIn !== undefined) {
        userLoggedIn()
      }
    })
  }, [])

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

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

//TODO Pages
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

import ProtectedRoute from './ProtectedRoute'
import HomePage from './pages/HomePage'

function App() {

  return (
    <AuthProvider>
        
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <LoginPage />} />
            <Route path='/register' element={ <RegisterPage />} />
            
            {/* // TODO Rutas Protegidas */}
            <Route element={<ProtectedRoute/>}>
              <Route path='/home' element={ <HomePage/> } />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

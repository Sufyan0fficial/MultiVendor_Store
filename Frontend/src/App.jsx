import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ActivationPage from './pages/UserActivation'

function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/activation/:id' element={<ActivationPage />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App

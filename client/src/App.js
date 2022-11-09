import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

    if (userData) {
      setIsLoggedIn(true)
      setUser(userData)
    }
  }, [])


  return (
    <>
      <Router>
        <Header isLoggedIn={ isLoggedIn } setIsLoggedIn={ setIsLoggedIn } user={ user } />

        <Routes>
          <Route path='/' element={
            <Home isLoggedIn={ isLoggedIn } user={ user } /> 
          } />
          <Route path='/signup' element={
            <Signup isLoggedIn={ isLoggedIn } setIsLoggedIn={ setIsLoggedIn } setUser={ setUser } />
          } />
          <Route path='/signin' element={
            <Signin isLoggedIn={ isLoggedIn } setIsLoggedIn={ setIsLoggedIn } setUser={ setUser } />
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App

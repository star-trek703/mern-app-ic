import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

    if (user) {
      setIsLoggedIn(true)
      setUser(user)
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
            <Signup isLoggedIn={ isLoggedIn } setIsLoggedIn={ setIsLoggedIn } />
          } />
          <Route path='/signin' element={
            <Signin isLoggedIn={ isLoggedIn } setIsLoggedIn={ setIsLoggedIn } />
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
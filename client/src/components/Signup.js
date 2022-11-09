import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = ({ isLoggedIn, setIsLoggedIn, setUser }) => {
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const { name, email, password, confirm_password } = formdata

  const onChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirm_password) {
      setError('Confirm password doesn\'t match with password')
      return
    }

    try {
      const userData = {
        name, email, password
      }
  
      const res = await axios.post("/auth/signup", userData)
      
      if (res.status === 201) {
        localStorage.setItem('user', JSON.stringify(res.data))
        
        setUser(res.data)
        setIsLoggedIn(true)
        navigate('/')
      }
    } catch (error) {
      const msg = error.response.data.message || error.message || 'Something went wrong'
      setError(msg)
    }
  }

  return (
    <div className="container">
      <div className="max-w-full md:w-96 bg-white text-gray-900 text-lg my-10 mx-auto p-5 rounded-md shadow">
        <div className="py-3">
          <h1 className="text-gray-800 text-3xl text-center font-semibold pb-2">Signup</h1>
          <p className="text-gray-700 text-lg text-center">Create an account</p>
        </div>

        <div className="bg-red-700 text-white text-center my-3 py-1 rounded" style={{ display: error ? 'block' : 'none' }}>
          { error }
        </div>

        <form className="mt-3" onSubmit={ onSubmit }>
          <div className="py-1">
            <label className="block pb-1" htmlFor="name">Name</label>
            <input className="block w-full px-3 py-1.5 border border-gray-300 focus:border-gray-500 rounded outline-none transition-all" type="text" name="name" id="name" placeholder="Name" value={ name } onChange={ onChange } />
          </div>
          <div className="py-1 mt-2">
            <label className="block pb-1" htmlFor="email">Email</label>
            <input className="block w-full px-3 py-1.5 border border-gray-300 focus:border-gray-500 rounded outline-none transition-all" type="text" name="email" id="email" placeholder="Email" value={ email } onChange={ onChange } />
          </div>
          <div className="py-1 mt-2">
            <label className="block pb-1" htmlFor="password">Password</label>
            <input className="block w-full px-3 py-1.5 border border-gray-300 focus:border-gray-500 rounded outline-none transition-all" type="password" name="password" id="password" placeholder="Password" value={ password } onChange={ onChange } />
          </div>
          <div className="py-1 mt-2">
            <label className="block pb-1" htmlFor="confirm_password">Confirm Password</label>
            <input className="block w-full px-3 py-1.5 border border-gray-300 focus:border-gray-500 rounded outline-none transition-all" type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" value={ confirm_password } onChange={ onChange } />
          </div>
          <div className="py-1 mt-5">
            <button className="block w-full bg-gray-900 hover:opacity-90 text-white px-3 py-2 border border-gray-300 focus:border-gray-500 rounded-md outline-none transition-all" type="submit">Create an account</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup

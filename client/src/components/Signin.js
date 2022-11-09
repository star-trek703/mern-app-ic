import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signin = ({ isLoggedIn, setIsLoggedIn }) => {
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const { email, password } = formdata

  const onChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const res = await axios.post("/auth/signin", {
      email, password
    })
    
    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify(res.data))
      
      setIsLoggedIn(true)
      navigate('/')
    }
  }

  return (
    <div className="container">
      <div className="max-w-full md:w-96 bg-white text-gray-900 text-lg my-10 mx-auto p-5 rounded-md shadow">
        <div className="py-3">
          <h1 className="text-gray-800 text-3xl text-center font-semibold pb-2">Signin</h1>
          <p className="text-gray-700 text-lg text-center">Login to your account</p>
        </div>

        <form className="mt-3" onSubmit={ onSubmit }>
          <div className="py-1">
            <label className="block pb-1" htmlFor="email">Email</label>
            <input className="block w-full px-3 py-1.5 border border-gray-300 focus:border-gray-500 rounded outline-none transition-all" type="text" name="email" id="email" value={ email } onChange={ onChange } />
          </div>
          <div className="py-1 mt-2">
            <label className="block pb-1" htmlFor="password">Password</label>
            <input className="block w-full px-3 py-1.5 border border-gray-300 focus:border-gray-500 rounded outline-none transition-all" type="password" name="password" id="password" value={ password } onChange={ onChange } />
          </div>
          <div className="py-1 mt-5">
            <button className="block w-full bg-gray-900 hover:opacity-90 text-white px-3 py-2 border border-gray-300 focus:border-gray-500 rounded-md outline-none transition-all" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
import { Link } from 'react-router-dom'

const Header = ({ isLoggedIn, setIsLoggedIn, user }) => {
  const onLogout = (e) => {
    e.preventDefault()

    localStorage.removeItem('user')
    setIsLoggedIn(false)
  }

  return (
    <header className="bg-white shadow">
      <div className="container flex items-center justify-between py-5">
        <Link className="text-gray-900 text-2xl font-semibold" to="/">Logo</Link>

        <nav>
          <ul>
            { isLoggedIn
            ? (
              <Link className="bg-gray-900 hover:opacity-90 text-white text-lg px-5 py-2 rounded" to="/" onClick={ onLogout }>Logout</Link>
            )
            : (
              <li>
                <Link className="bg-gray-900 hover:opacity-90 text-white text-lg px-5 py-2 rounded" to="/signup">Register</Link>
                <Link className="bg-gray-900 hover:opacity-90 text-white text-lg px-5 py-2 rounded ml-5" to="/signin">Login</Link>
              </li>
            ) }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
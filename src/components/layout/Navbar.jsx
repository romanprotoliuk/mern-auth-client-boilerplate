import { Link } from "react-router-dom"

const Navbar = ({ handleLogout, currentUser }) => {
  // if the user is logged in 
  const loggedIn = (
    <>
      <Link to="/profile">Profile</Link>
      <Link to="/">{/* to do add function to log out */}<span onClick={handleLogout}>Logout</span></Link>
    </>
  )

  const loggedOut = (
    <>
      <Link to="/login"> Login</Link>
      <Link to="/register">Register</Link>
    </>
    )

  return (
    <nav>
      <Link to="/">User App</Link>

      {currentUser ? loggedIn : loggedOut }
    </nav>
  )
}

export default Navbar
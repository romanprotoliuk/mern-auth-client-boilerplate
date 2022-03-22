import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Navigate } from "react-router-dom"


const Login = ({ currentUser, setCurrentUser }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [msg, setMessage] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      // post to the backend with the form data to login 
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, form)
      const {token} = response.data
      const decoded = jwt_decode(token)
      // decode the token that is sent to use
      console.log(decoded)
      // save the token in localstorage
      localStorage.setItem('jwt', token)
      
      // set the app state to the logged in user 
      setCurrentUser(decoded)
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        console.log(error.data.response.data)
        setMessage(error.response.data.msg)
      }
      console.log(error)
    }
  }

  if (currentUser) return <Navigate to="/profile" />

  return (
    <div>
      <h3>Login Form</h3>
      <p>{msg ? `the server has a message for you: ${msg}` : ''}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          placeholder="user@domain.com"
          type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          value={form.email}
          name="email"
        />

      <label htmlFor="password">Password:</label>
        <input
          id="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          type="password"
          value={form.password}
          name="password"
        />

        <input type="submit" />
      </form>
    </div>
  )
}

export default Login
import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Navigate } from "react-router-dom"

const Register = ({ currentUser, setCurrentUser }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    passwordConfirmation: ''
  })

  const [msg, setMessage] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {

      if (form.password === form.passwordConfirmation) {
        // post to the backend with the form data to login 

        delete form.passwordConfirmation
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, form)
        const {token} = response.data
        const decoded = jwt_decode(token)
        // decode the token that is sent to use
        console.log(decoded)
        // save the token in localstorage
        localStorage.setItem('jwt', token)
        
        // set the app state to the logged in user 
        setCurrentUser(decoded)

      } else {
        setMessage('Passwords do not match')
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.msg)
      } else {
        console.log(error)
      }
    }
  }

  if (currentUser) return <Navigate to="/profile" />
  return (
    <div>
      <h3>Login Form</h3>
      {/* <p>{msg ? `the server has a message for you: ${msg}` : ''}</p> */}
      <p>{msg}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          placeholder="name"
          type="text"
          onChange={e => setForm({ ...form, name: e.target.value })}
          value={form.name}
          name="name"
        />
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
          placeholder="Password"
          type="password"
          value={form.password}
          name="password"
        />
        <label htmlFor="passwordConfirmation">Password Confirmation:</label>
        <input
          id="passwordConfirmation"
          onChange={e => setForm({ ...form, passwordConfirmation: e.target.value })}
          placeholder="Password Confirmation"
          type="password"
          value={form.passwordConfirmation}
          name="passwordConfirmation"
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Register
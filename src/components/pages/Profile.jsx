import { useState, useEffect } from "react"
import axios from 'axios'

const Profile = ({ currentUser }) => {
  const [msg, setMsg] = useState('')
  useEffect(() => {
    (async () => {
      try {
        // get token from local storage
        const token = localStorage.getItem('jwt')
        // make the auth headers
        const options = {
          headers: {
            'Authorization': token
          }
        }
        // hit the auth headers
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
        // set the data from the server
        setMsg(response.data.msg)
      } catch (error) {
        console.log(error)
      }  
    })()
  }, [])
  return (
    <div>
      <h3>{currentUser.name}'s Profile</h3>
      <p>your email is {currentUser.email}</p>

      <h6>{msg}</h6>
    </div>
  )
}

export default Profile
import React from 'react'
import { NavLink } from 'react-router-dom'
import "../pages/Home.css"
const Home = () => {
  const verifyEmail = async (event) => {
    event.preventDefault()
    try {
      const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken : JSON.parse(localStorage.getItem("idtoken")).idToken,
          }),
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      if (res.ok) {
        alert("VERIFICATION MAIL SENDED PLEASE CHECK YOUR MAIL");
      }
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <h1>Welcome To Expense Tracker</h1>
      <h3>
        Your Profile is incomplete<br></br>
        <NavLink to="/update" >complete now</NavLink>
      </h3>
      <div className='verify-email text-center pt-1' ><button style={{ "cursor": "pointer", "color": "blue" }} onClick={verifyEmail}>Verify Email</button></div>

    </div>
  )
}

export default Home
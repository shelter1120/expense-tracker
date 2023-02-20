import React from 'react'
import { NavLink } from 'react-router-dom'
import "../pages/Home.css"
const Home = () => {
  return (
    <div>
        <h1>Welcome To Expense Tracker</h1>
        <h3 className='nav vali'>
          Your Profile is incomplete<br></br>
          <NavLink to="/update">complete now</NavLink>
        </h3>
    </div>
  )
}

export default Home
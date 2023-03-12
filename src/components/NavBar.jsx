import React from 'react'
import { logo } from '../utils/constants'
import { Button } from './'
const NavBar = () => {
  return (
    <nav style={{
        backgroundColor: '#95d6a4', 
        color: 'white',
        height: '10vh',
        display: 'flex',
        justifyContent: 'space-between'
        }}
        >
        <img src={logo} alt='logo' 
         style={{ 
            marginTop: '0.50rem',
            marginLeft: '0.50rem',
            height: '40px',
            padding: '0rem'
        }} 
         />
         <Button />
         <Button />
        </nav>
  )
}

export default NavBar
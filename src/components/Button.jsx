import React from 'react'

const Button = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0'
    }}
    >
        <button style={{
            marginLeft: '10rem',
            borderRadius: '10px',
            border: 'none',
            fontSize: '1rem'
        }}>Notes</button>
    </div>
  )
}

export default Button
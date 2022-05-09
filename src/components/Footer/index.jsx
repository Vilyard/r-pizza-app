import React from 'react'

const Footer = () => {
  return (
    <footer>
      
      <p style={{ background: '#222', padding: '10px', color: 'white' }}>
        Copyright @{new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer
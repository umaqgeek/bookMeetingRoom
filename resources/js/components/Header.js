import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel fixed-top'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>Book Meeting Room</Link>
    </div>
  </nav>
)

export default Header

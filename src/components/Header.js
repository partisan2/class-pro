import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
        <p>
            <Link className='pro_name' to={'/'}>
                Class Pro
            </Link>
        </p>
    </div>
  )
}

export default Header

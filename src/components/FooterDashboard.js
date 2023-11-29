import React from 'react'
import './FooterDashboard.css'
import { Link } from 'react-router-dom'

function FooterDashboard() {
  return (
    <footer>
        <div className="footer-content">
        <h3>ClassPro</h3>
        <p>
            ClassPro is a platform that helps students to learn and improve their skills.
        </p>
        <ul className="socials">
          <br/>
            <li><Link to="#"><i class="fa fa-facebook"></i></Link></li>
            <li><Link to="#"><i class="fa fa-twitter"></i></Link></li>
            <li><Link to="#"><i class="fa fa-google-plus"></i></Link></li>
            <li><Link to="#"><i class="fa fa-youtube"></i></Link></li>
            <li><Link to="#"><i class="fa fa-linkedin-square"></i></Link></li>
        </ul>
        <ul className="footer-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="#">Blog</Link></li>
         </ul>
        </div>
  </footer>
  )
}

export default FooterDashboard

import React from 'react'
import './FooterDashboard.css'

function FooterDashboard() {
  return (
    <footer>
        <div class="footer-content">
        <h3>ClassPro</h3>
        <p>
            ClassPro is a platform that helps students to learn and improve their skills.
        </p>
        <ul class="socials">
            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
            <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
            <li><a href="#"><i class="fa fa-youtube"></i></a></li>
            <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
        </ul>
        <ul class="footer-menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Blog</a></li>
         </ul>
        </div>
  </footer>
  )
}

export default FooterDashboard
